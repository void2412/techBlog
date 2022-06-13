require('dotenv').config()
const Sequelize = require('sequelize')



const sequelize = process.env.JAWSDB_URL 
?	new Sequelize(process.env.JAWSDB_URL) 
:	new Sequelize(
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