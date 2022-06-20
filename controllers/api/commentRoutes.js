const router = require('express').Router()
const {Comment} = require('../../models')
const {authenticatePost} = require('../../utils/authentication')

router.post('/:post_id', authenticatePost, async (req, res)=>{
	try {
		
		if(req.session.logged_in) {
			const newComment = await Comment.create({
				...req.body,
				post_id: req.params.post_id,
				user_id: req.session.user_id
			})
	
			res.status(200).json(newComment)
		}
		else{
			res.status(401).send('Unauthorized')
		}
	}
	catch(err){
		res.status(400).json(err)
	}
})

router.put('/:id/:post_id', authenticatePost, async (req, res)=>{
	try {
		const commentData = await Comment.update({
			content: req.body.content
		},
		{
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
				post_id: req.params.post_id
			}
		})

		if(!commentData){
			res.status(404).json({message:"No Comment Found"})
			return
		}

		res.status(200).json(commentData)
	}
	catch(err){
		res.status(500).json(err)
	}
})

router.delete('/:id/:post_id', authenticatePost, async(req,res)=>{
	try{
		const commentData = await Comment.destroy({
			where:{
				id: req.params.id,
				user_id: req.session.user_id,
				post_id: req.params.post_id
			}
		})

		if(!commentData){
			res.status(404).json({message:'No Comment Found'})
			return
		}

		res.status(200).json(commentData)
	}
	catch(err){
		res.status(500).json(err)
	}
})

module.exports = router