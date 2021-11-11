import dotenv from 'dotenv'
dotenv.config()

import Sequelize from 'sequelize'
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    provider: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {type: Sequelize.DATE, field: 'created_at'},
    updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
})

export default User
/*
require('dotenv').config()
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    provider: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {type: Sequelize.DATE, field: 'created_at'},
    updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
})

const Repository = require('./Repository')
const Contract = require('./Contract')

User.hasMany(Repository, {
    as: 'repositories',
    foreignKey: 'user_id'
})

User.hasMany(Contract, {
    as: 'contracts',
    foreignKey: 'user_id'
})

Repository.hasMany(Contract, {
    as: 'contracts',
    foreignKey: 'user_id'
})

Repository.belongsTo(User, {
    foreignKey: 'user_id',
    foreignKeyConstraint: true
})

Contract.belongsTo(Repository, {
    foreignKey: 'repository_id',
    foreignKeyConstraint: true
})
Contract.belongsTo(User,{
    foreignKey: 'user_id',
    foreignKeyConstraint: true,
})

module.exports = User

 */