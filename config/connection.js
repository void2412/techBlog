requires('dotenv').config()
const Sequelize = require('sequelize')

let sqlModel

process.env.JAWSDB_URL ? 
sqlModel = new Sequelize(process.env.JAWSDB_URL) : 
sqlModel = new Sequelize(
	process.env.db_name,
	process.env.db_user,
	process.env.db_password,
	{
		host: 'localhost',
		dialect: 'mysql',
		port: 3306
	}
)

module.exports = sqlModel