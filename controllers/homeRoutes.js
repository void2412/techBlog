const router = require('express').Router()
const authenticate = require('../utils/authentication')
const {User, Post} = require('../models')

router.get('/', async (req, res) => {
	try{
		const postData = await Post.findAll({
			include: [{model: User, attribute: ['username']}]
		})

		const post = postData.map((post) => post.get({plain: true}))
		res.render('homepage',{
			post,
			logged_In: req.session.logged_In,
			id: req.session.id
		})
	}
	catch (e){
		res.status(500).json(e)
	}
})

router.get('/post/:id', async )