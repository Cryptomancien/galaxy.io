const SmartContract = require('../../models/SmartContract')

exports.all = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const smarts_contracts = await SmartContract.find({
        user_id: request.user.id
    })

    return response.json(smarts_contracts)
}