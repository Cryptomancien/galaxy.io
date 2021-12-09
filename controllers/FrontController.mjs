import dotenv from 'dotenv'
dotenv.config()

import Sequelize from "sequelize";
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})
import QueryTypes from "sequelize";

const FrontController = {

    async index(request, response) {
        const sql = 'select contracts.*, users.username, users.avatar_url from contracts left join users on users.id = contracts.user_id order by id desc LIMIT 9;'
        let contracts = await sequelize.query(sql, { type: QueryTypes.SELECT })
        contracts = contracts[0]

        const data = {
            user: request.user,
            contracts
        }


        await response.render('index.html', data)
    },


    async search(request, response) {
        const search = await request.query.search ?? ''
        const sql = 'select contracts.*, users.username, users.avatar_url from contracts left join users on users.id = contracts.user_id order by id desc;'

        let contracts = await sequelize.query(sql, { type: QueryTypes.SELECT })
        contracts = contracts[0]

        let data = {
            user: request.user,
            contracts
        }

        return await response.render('search.html', data)
    },

    async contract(request, response) {
        const id = await request.params.id
        const sql = `select contracts.*, users.username, users.avatar_url from contracts left join users on users.id = contracts.user_id WHERE contracts.id = ${id} LIMIT 1;`
        let contract = await sequelize.query(sql, { type: QueryTypes.SELECT })
        contract = contract[0]

        const data = {
            contract
        }
        response.json(data)
        //response.render('contract.html', data)
    }
}

export default FrontController
/*






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



exports.play = async (request, response) => {
    response.render('play.html')
}

 */