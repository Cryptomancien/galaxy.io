const Repository = require('../../models/Repository')

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
    const username = request.user.username
    const name = request.body.repository
    const content = request.body.content

    const data = {
        url,
        user_id,
        username,
        name,
        content
    }

    await Repository.create(data)

    await response.json('success')
}

exports.show = async (request, response) => {

    const id = request.params.id

    const repository = await Repository.findById(id)

    await response.json(repository)
}

exports.destroy = async (request, response) => {
    const id = request.params.id

    await Repository.findByIdAndDelete(id)

    await response.json('success')
}