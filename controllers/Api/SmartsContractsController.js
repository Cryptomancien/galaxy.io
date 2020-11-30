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
        username: request.user.username,
        user_id: request.user.user_id,
        content: request.body.content
    }

    const url = `https://raw.githubusercontent.com/${data.username}/${data.repository}/main/${data.file}`
    await axios.get(url).then(async resp => data.content = resp.body)


    await SmartContract.create(data)

    return await response.json('success')
}