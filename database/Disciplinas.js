const Sequelize = require('sequelize')
const connection = require('./database')

const Disciplinas = connection.define('disciplinas', {
    codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    area: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    semestre: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Disciplinas.sync({ force: false }).then(() => {})

module.exports = Disciplinas
