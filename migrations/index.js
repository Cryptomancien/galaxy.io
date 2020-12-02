require('dotenv').config()

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

async function tryConnect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully. poop');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}



async function getMigrations() {
    let sql = await readFile(__dirname + '/' + 'main.sql', 'utf-8')
    return sql
}
getMigrations().then(data => {
    sequelize.query(data, {raw: true})
})






