const{Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Model {}

Post.init(
	{
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id:{
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: 'user',
				key: 'username'
			}
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		content:{
			type: DataTypes.TEXT,
			allowNull: true
		}
	},
	{
		sequelize,
		timestamp:true,
		freezeTableName: true,
		underscore: true,
		modelName:'post',
	}
)

module.exports = Post