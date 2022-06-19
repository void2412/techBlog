const sequelize = require('../config/connection')
const {User, Post, Comment} = require('../models')

const userSeed = require('./UserData.json')
const postSeed = require('./PostData.json')
const commentSeed = require('./CommentData.json')

const seedDb = async ()=> {
	await sequelize.sync({force:true})
	const users = await User.bulkCreate(userSeed,{
		individualHooks: true,
    	returning: true
	})
	let posts =[]
	for (const post of postSeed){
		const newPost = await Post.create({
			user_id: users[Math.floor(Math.random() * users.length)].id,
			...post
		})
		posts.push(newPost)
	}

	for (const comment of commentSeed){
		const newComment = await Comment.create({
			user_id: users[Math.floor(Math.random() * users.length)].id,
			post_id: posts[Math.floor(Math.random() * posts.length)].id,
			...comment
		})
	}

	process.exit()
}

seedDb()