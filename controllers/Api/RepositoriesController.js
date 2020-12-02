const Repository = require('../../models/Repository')
const SmartContract = require('../../models/Contract')
const toml = require('toml')
const axios = require('axios')

exports.index = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const repositories = await Repository.find({
        user_id: request.user.id
    })

    return response.json(repositories)
}

exports.store = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const url = request.body.url
    const user_id = request.user.id
    const username = request.user.login
    const name = request.body.name
    const content = request.body.content

    const data = {
        url,
        user_id,
        username,
        name,
        content
    }

    const repository = await Repository.create(data)

    await response.json(repository)
}

exports.show = async (request, response) => {

    const id = request.params.id

    const repository = await Repository.findById(id)

    await response.json(repository)
}

exports.update = async (request, response) => {
    const id = request.params.id

    const repository = await Repository.findById(id)

    const url = `https://raw.githubusercontent.com/${repository.username}/${repository.name}/main/galaxy.json`

    const resp = await axios.get(url)
    const data = await resp.data

    repository.content = await data

    await repository.save()

    await response.json(repository)
}

exports.destroy = async (request, response) => {
    const id = request.params.id

    await Repository.findByIdAndDelete(id)

    await response.json('success')
}

exports.test = async (request, response) => {

    const r = await Repository.findById('5fc3e4b444f792f76a369a4e')
    const username = r.username
    const name = r.name

    const start_url = `https://raw.githubusercontent.com/${username}/${name}/main/`

    let file_error = ''
    let smart_contracts_array = []

    for await (sc of r.content.smart_contracts) {
        const url = `${start_url}/${sc.file}`

        try {
            const response = await axios.get(url)
            const data = await response.data
            const content = await data

            const title = sc.title
            const description = sc.description
            const file = sc.file
            const version = sc.version
            const username = request.user?.username
            const repository = r.name
            const repository_id = r.id

            const o = {
                title,
                description,
                file,
                version,
                username,
                repository,
                content,
                repository_id
            }

            smart_contracts_array.push(o)

        } catch (error) {
            file_error = sc.file
        }

        if ( file_error.length) {
            return await response.json({
                error: file_error
            })
        }


    }

    await SmartContract.insertMany(smart_contracts_array)

    await response.json(smart_contracts_array)
}