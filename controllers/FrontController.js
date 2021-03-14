const User = require('../models/User')
const Repository = require('../models/Repository')
const Contract = require('../models/Contract')

require('dotenv').config()
const { Sequelize, Model, DataTypes, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

exports.index = async (request, response) => {

    const sql = 'select contracts.*, users.username, users.avatar_url from contracts left join users on users.id = contracts.user_id order by id desc LIMIT 9;'
    const contracts = await sequelize.query(sql, { type: QueryTypes.SELECT })

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
    const sql = 'select contracts.*, users.username, users.avatar_url from contracts left join users on users.id = contracts.user_id order by id desc;'

    const contracts = await sequelize.query(sql, { type: QueryTypes.SELECT })

    let data = {
        user: request.user,
        contracts
    }

    return await response.render('search.html', data)
}

exports.contract = async (request, response) => {
    const id = await request.params.id
    const sql = `select contracts.*, users.username, users.avatar_url from contracts left join users on users.id = contracts.user_id WHERE contracts.id = ${id} LIMIT 1;`

    let contract = await sequelize.query(sql, { type: QueryTypes.SELECT })
    contract = contract[0]

    const data = {
        contract
    }

    response.render('contract.html', data)
}

exports.user = async (request, response) => {

    const username = await request.params.username

    const u = await User.findOne({
        where: {
            username
        },
    })

    const contracts = await Contract.findAll({
        where: {
            user_id: u.id
        },
        order: [
            ['id', 'desc']
        ]
    })

    const data = {
        user: request.user,
        u,
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

exports.play = async (request, response) => {
    response.render('play.html')
}