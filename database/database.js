const Sequelize = require('sequelize')

const connection = new Sequelize('smduvidas', 'root', 'ufc123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
