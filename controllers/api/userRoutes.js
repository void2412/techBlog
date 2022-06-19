const router = require('express').Router()
const { User } = require('../../models')

router.post('/login', async (req, res) => {
	try {
		// find username
		const userData = await User.findOne({where:{username: req.body.username}})
		
		if(!userData){
			res.status(400).json({message: 'Incorrect email or password, please try again'})
			return
		}
		// validate password
		const validatePassword = await userData.checkPassword(req.body.password)

		if(!validatePassword){
			res.status(400).json({message: 'Incorrect email or password, please try again'})
			return
		}

		// add info into session
		req.session.save(() => {
			req.session.user_id = userData.dataValues.id
			req.session.logged_in = true
			res.status(200).json({user: userData, message: 'You are now logged in'})
		})
	}
	catch (e){
		res.status(400).json(e)
	}
})

router.post('/signup', async (req, res) => {
	try{
		const userData = await User.create(req.body)

		req.session.save(()=> {
			req.session.user_id = userData.dataValues.id
			req.session.logged_in = true
			res.status(200).json({user: userData, message: 'Welcome to my blog'})
		})
	}
	catch (e){
		res.status(400).json(e)
	}
})





module.exports = router