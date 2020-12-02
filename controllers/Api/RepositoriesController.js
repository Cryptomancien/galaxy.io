const Repository = require('../../models/Repository')
const Contract = require('../../models/Contract')
const axios = require('axios')

exports.index = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const repositories = await Repository.findAll({
        where: {
            user_id: request.user.id
        }
    })

    return response.json(repositories)
}

exports.store = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const url = request.body.url
    const user_id = request.user.id
    const username = request.user.username
    const name = request.body.name
    let content = request.body.content
    content = JSON.stringify(content)

    const data = {
        url,
        user_id,
        username,
        name,
        content
    }

    //console.log(data)

    const repository = await Repository.create(data)

    await response.json(repository)
}

exports.show = async (request, response) => {

    const id = request.params.id

    const repository = await Repository.findByPk(id)

    await response.json(repository)
}

exports.update = async (request, response) => {
    const id = request.params.id

    const repository = await Repository.findByPk(id)

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

}