const router = require('express').Router()
const authenticate = require('../utils/authentication')
const {User, Post, Comment} = require('../models')

router.get('/', async (req, res) => {
	try{
		const postData = await Post.findAll({
			include: {model: User, attributes: ['username']}
		})

		const posts = postData.map((post) => post.get({plain: true}))
		
		if(req.session.logged_in === true){
			posts.forEach((post)=>{
				if (req.session.user_id == post.user_id){
					post.owner = true
				}
			})
		}
		
		res.render('homepage',{
			posts,
			logged_in: req.session.logged_in
		})
		
	}
	catch (e){
		res.status(500).json(e)
	}
})

router.get('/post/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include:[{
				model: Comment, include:{model: User, attributes: ['username']}
			}, {
				model: User, attributes: ['username']
			}]
		})
		if(!postData){
			res.status(404).send('No Post Found')
			return
		}
		const posts = postData.get({plain: true})
		
		if (posts.user_id === req.session.user_id){
			posts.post_owner = true
		}

		posts.comments.forEach((comment)=>{
			if(comment.user_id === req.session.user_id){
				comment.comment_owner=true
			}
		})

		res.render('postDetails', {
			...posts,
			logged_in: req.session.logged_in
		})
	}
	catch (e){
		res.status(500).json(e)
	}
})

router.get('/dashboard', authenticate, async (req, res) => {
	try{
		if(req.session.logged_in){
			const userData = await User.findByPk(req.session.user_id,{
				attributes: {exclude: ['password']},
				include: [{model: Post}]
			})

			const user = userData.get({plain: true})
			
			res.render('dashboard', {
				logged_in: req.session.logged_in,
				...user
			})
		}
		else{
			res.redirect('/login')
		}
	}
	catch (e){
		res.status(500).json(e)
	}
})

router.get('/dashboard/new', authenticate, async (req, res) => {
	try{
			res.render('newPost', 
			{logged_in: req.session.logged_in})
	}
	catch (e){
		res.status(500).json(e)
	}
})

router.get('/dashboard/edit/:id', authenticate, async (req, res,) =>{
	try{
		const postData = await Post.findByPk(req.params.id)
		if (!postData){
			res.status(404).send('No Post Found')
			return
		}

		if(!postData){
			res.status(404).send('No Post Found')
		}
		const post= postData.get({plain: true})
		
		
		res.render('editPost',
		{logged_in: req.session.logged_in,
		...post})
	}
	catch (e){
		res.status(500).json(e)
	}
})

router.get('/login', async (req, res) => {
	if (req.session.logged_in){
		res.redirect('/dashboard')
		return
	}

	res.render('login')
})

router.get('/signup', async (req, res) => {
	if (req.session.logged_in){
		res.redirect('/dashboard')
		return
	}

	res.render('signup')
})
module.exports =router