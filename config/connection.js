requires('dotenv').config()
const Sequelize = require('sequelize')

let sequelize

process.env.JAWSDB_URL ? 
sequelize = new Sequelize(process.env.JAWSDB_URL) : 
sequelize = new Sequelize(
	process.env.db_name,
	process.env.db_user,
	process.env.db_password,
	{
		host: 'localhost',
		dialect: 'mysql',
		port: 3306
	}
)

module.exports = sequelize