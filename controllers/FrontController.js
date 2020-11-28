const SmartContract = require('../models/SmartContract')

exports.index = async (request, response) => {

    const smarts_contracts = await SmartContract.find({}).sort({created_at: -1})

    const data = {
        user: request.user,
        smarts_contracts
    }

    response.render('index.html', data)
}

exports.getStarted = async (request, response) => {
    response.render('get-started.html')
}

exports.search = async (request, response) => {

    const smarts_contracts = await SmartContract.find({}).sort({created_at: -1})

    let data = {
        user: request.user,
        smarts_contracts
    }

    response.render('search.html', data)
}

exports.smartContract = async (request, response) => {
    const id = await request.params.id
    const smart_contract = await SmartContract.findById(id)

    const data = {
        smart_contract
    }

    response.render('smart-contract.html', data)
}

exports.login = async (request, response) => {
    let data = {
        isAuth: request.isAuthenticated()
    }

    response.render('login.html', data)
}

exports.logout = async (request, response) => {
    request.logout()
    response.redirect('/')
}