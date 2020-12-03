const User = require('../models/User')
const Contract = require('../models/Contract')

exports.index = async (request, response) => {

    const contracts = await Contract.findAll({
        order: [
            ['id', 'DESC']
        ]
    })

    const data = {
        user: request.user,
        contracts
    }

    await response.render('index.html', data)
}

exports.getStarted = async (request, response) => {
    response.render('get-started.html')
}

exports.search = async (request, response) => {

    const search = await request.query.search ?? ''

    const contracts = await Contract.findAll({
        include: [
            User
        ]
    })

    let data = {
        user: request.user,
        contracts
    }

    return await response.render('search.html', data)
}

exports.smartContract = async (request, response) => {
    const id = await request.params.id
    const contracts = await Contract.findByPk(id)

    const data = {
        contracts
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