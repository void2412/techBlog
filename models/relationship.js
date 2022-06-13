const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

User.hasMany(Comment, {
	foreignKey: 'user_id',
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE'
})
User.hasMany(Post, {
	foreignKey: 'user_id',
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE'
})

Post.belongsTo(User, {
	foreignKey: 'user_id'
})

Post.hasMany(Comment, {
	foreignKey: 'post_id',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE'
})

Comment.belongsTo(Post,{
	foreignKey: 'post_id'
})

Comment.belongsTo(User, {
	foreignKey: 'user_id'
})

model.exports = {User, Post, Comment}