const{Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Comment extends Model {}

Comment.init(
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
		post_id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'post',
				key: 'id'
			}
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
		modelName: 'comment',
	}
)

module.exports = Comment