const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

User.hasMany(Comment, {
	foreignKey: 'user_comment',
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE'
})

User.hasMany(Post, {
	foreignKey: 'user_post',
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE'
})

Post.hasMany(Comment, {
	foreignKey: 'post_comment',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE'
})

Post.belongsTo(User)

Comment.belongsTo(Post)

Comment.belongsTo(User)

model.exports = {User, Post, Comment}