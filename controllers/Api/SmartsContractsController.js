const SmartContract = require('../../models/SmartContract')
const axios = require('axios')

exports.all = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const smarts_contracts = await SmartContract.find({
        user_id: request.user.id
    })

    return response.json(smarts_contracts)
}

exports.store = async (request, response) => {


    const data = {
        title: request.body.title,
        description: request.body.description,
        version: request.body.version,
        file: request.body.file,
        repository: request.body.repository,
        username: request.user?.login,
        user_id: request.user?.id,
        content: request.body.content
    }

    const smart_contract = await SmartContract.create(data)

    return await response.json(smart_contract)
}

exports.show = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const id = request.query.id
    const smart_contract = await SmartContract.findByID(id)

    return await response.json(smart_contract)
}