require('dotenv').config()
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

const Contract = sequelize.define('Contract', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file: {
        type: Sequelize.STRING,
        allowNull: false
    },
    version: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    repository_id: {
        type: Sequelize.INTEGER,
        references: 'repositories',
        referencesKey: 'id',
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: 'users',
        referencesKey: 'id',
    },
    createdAt: {type: Sequelize.DATE, field: 'created_at'},
    updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
}, {
    sequelize,
    modelName: 'Contract',
    tableName: 'contracts'
})

module.exports = Contract

