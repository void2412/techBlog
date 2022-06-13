const{Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class User extends Model {}

User.init(
	{
		username:{
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			autoIncrement: false
		},
		password:{
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		timestamp:true,
		freezeTableName: true,
		underscore:true,
		modelName:'user',
	}
)

module.exports = User