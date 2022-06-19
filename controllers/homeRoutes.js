const router = require('express').Router()
const authenticate = require('../utils/authentication')
const {User, Post, Comment} = require('../models')

router.get('/', async (req, res) => {
	try{
		const postData = await Post.findAll({
			include: {model: User, attributes: ['username']}
		})

		const posts = postData.map((post) => post.get({plain: true}))

		res.render('homepage',{
			posts,
			logged_In: req.session.logged_In,
			id: req.session.user_id
		})
		console.log(req.session.user_id)
	}
	catch (e){
		res.status(500).json(e)
	}
})

router.get('/post/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include:[{
				model: Comment, include:{model: User, attribute: ['username']}
			}]
		})

		const post = postData.get({plain: true})

		res.render('postDetails', {
			...post,
			id: req.session.user_id
		})
	}
	catch (e){
		res.status(500).json(e)
	}
})

module.exports =router