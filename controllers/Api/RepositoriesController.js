const Repository = require('../../models/Repository')

exports.index = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const repositories = await Repository.find({
        user_id: request.params.id
    })

    return response.json(repositories)
}

exports.store = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const config_file = request.body.config
    const username = request.body.username
    const user_id = request.body.user_id
    const repo = request.body.repo

    console.log(request.body)

    if ( ! config_file.smarts_contracts) {
        return response.json('the file must contains a key called smarts_contracts')
    }

    await response.json('Repository created')
}