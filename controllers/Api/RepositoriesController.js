require('dotenv').config()
const { Sequelize, Model, DataTypes, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

const Repository = require('../../models/Repository')
const Contract = require('../../models/Contract')
const axios = require('axios')

exports.index = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const repositories = await Repository.findAll({
        where: {
            user_id: request.user.id
        }
    })

    return response.json(repositories)
}

exports.store = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const url = request.body.url
    const public_id = request.body.public_id
    const user_id = request.user.id
    const username = request.user.username
    const name = request.body.name
    let content = request.body.content
    content = JSON.stringify(content)

    const data = {
        url,
        public_id,
        user_id,
        username,
        name,
        content
    }

    //console.log(data)

    const repository = await Repository.create(data)

    await response.json(repository)
}

exports.show = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const id = request.params.id

    const repository = await Repository.findOne({
        where: {
            id
        },
        include: {
            model: Contract,
            as: 'contracts',
            required: false
        }
    })

    await response.json(repository)
}

exports.update = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const id = request.params.id

    const repository = await Repository.findByPk(id)

    const url = `https://raw.githubusercontent.com/${repository.username}/${repository.name}/main/galaxy.json`

    const resp = await axios.get(url)
    const data = await resp.data

    repository.content = await data

    await repository.save()

    await response.json(repository)
}

exports.destroy = async (request, response) => {
    if ( ! request.user) {
        return response.json('you must to be logged')
    }

    const id = request.params.id

    const repository = await Repository.findByPk(id)

    if (repository.user_id == request.user.id) {
        await repository.destroy()
        await response.json(true)
    }
    else {
        await response.json(false)
    }
}

exports.home = async (request, response) => {

    const sql = `
        select *
        from repositories
                 left join contracts on repositories.id = contracts.repository_id
        where contracts.user_id = 8652937
        group by repositories.id, contracts.id;
    `
    const repositories = await sequelize.query(sql, { type: QueryTypes.SELECT })

    response.json(repositories)
}

exports.test = async (request, response) => {

}