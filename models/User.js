const{Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')
class User extends Model {
	checkPassword(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	}
}

User.init(
	{
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username:{
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password:{
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		hooks:{
			beforeCreate: async (newUserData) => {
				const salt = await bcrypt.genSalt(saltRounds)
				newUserData.password = await bcrypt.hash(newUserData.password, salt)
				return newUserData
			},
			beforeUpdate: async (updatedUserData) => {
				const salt = await bcrypt.genSalt(saltRounds)
				updatedUserData.password = await bcrypt.hash(updatedUserData.password, salt)
				return updatedUserData
			}
		},
		sequelize,
		timestamp:true,
		freezeTableName: true,
		underscore:true,
		modelName:'user',
	}
)

module.exports = User