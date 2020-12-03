const User = require('../models/User')
const Repository = require('../models/Repository')
const Contract = require('../models/Contract')

exports.index = async (request, response) => {

    const contracts = await Contract.findAll({
        include: [
          User
        ],
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

exports.contract = async (request, response) => {
    const id = await request.params.id
    const contract = await Contract.findOne({
        where: {
            id
        },
        include: [
            User
        ]
    })

    const data = {
        contract
    }

    response.render('contract.html', data)
}

exports.user = async (request, response) => {

    const username = request.params.username

    const user = await User.findOne({
        where: {
            username
        },
    })

    const contracts = await Contract.findAll({
        where: {
            user_id: user.id
        }
    })

    const data = {
        user,
        contracts
    }

    await response.render('user.html', data)
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