import Contract from '../../models/Contract.mjs'
// TODO deplace in middleware
const ContractsController = {
    async all(request, response) {
        if ( ! request.user) {
            return response.json('you must to be logged')
        }

        const contracts = await Contract.findAll({
            where: {
                user_id: request.user.id
            }
        })

        return response.json(contracts)
    },

    async store(request, response) {
        if ( ! request.user) {
            return response.json('you must to be logged')
        }

        const data = {
            title: request.body.title,
            description: request.body.description,
            version: request.body.version,
            url: request.body.url,
            content: request.body.content,
            user_id: request.user.id,
        }

        console.log(data)

        const contract = await Contract.create(data)

        return await response.json(contract)
    },

    async show(request, response) {
        if ( ! request.user) {
            return response.json('you must to be logged')
        }


        const id = request.params.id
        const contract = await Contract.findByPk(id)

        return await response.json(contract)
    },

    async update(request, response) {

    },

    async destroy(request, response) {

    }
}

export default ContractsController

/*
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
        url: request.body.url,
        content: request.body.content,

        username: request.user.username,
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

 */