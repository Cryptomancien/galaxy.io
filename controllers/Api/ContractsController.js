const Contract = require('../../models/Contract')
const axios = require('axios')

exports.all = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const contracts = await Contract.findAll({
        where: {
            user_id: request.user.id
        }
    })

    return response.json(contracts)
}

exports.store = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const data = {
        title: request.body.title,
        description: request.body.description,
        version: request.body.version,
        file: request.body.file,
        repository: request.body.repository,
        username: request.user.username,
        content: request.body.content,
        repository_id: request.body.repository_id,
        user_id: request.user.id,
    }

    console.log(data)

    const contract = await Contract.create(data)

    return await response.json(contract)
}

exports.show = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const id = request.query.id
    const contract = await Contract.findByPk(id)

    return await response.json(contract)
}