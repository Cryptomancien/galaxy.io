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
    const config_file = request.body.config
    const username = request.body.username
    const repo = request.body.repo

    console.log(request.body)

    if ( ! config_file.smarts_contracts) {
        return response.json('the file must contains a key called smarts_contracts')
    }

    for await (smart_contract of config_file.smarts_contracts) {
        const file_to_parse = await `https://raw.githubusercontent.com/${username}/${repo}/main/${smart_contract.file}`

        await axios.get(file_to_parse).then( async (resp) => {

            const data = await {
                title: smart_contract.title,
                description: smart_contract.description,
                version: smart_contract.version,
                content: resp.data
            }

            await SmartContract.create(data)
        })
    }
    await response.json('success')
}