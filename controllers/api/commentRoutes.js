const router = require('express').Router()
const {Comment} = require('../../models')
const authenticate = require('../../utils/authentication')

router.post('/',authenticate, async (req, res)=>{
	try {
		const newComment = await Comment.create({
			...req.body,
			user_id: req.session.user_id
		})

		res.status(200).json(newComment)
	}
	catch(err){
		res.status(400).json(err)
	}
})

router.put('/:id', authenticate, async (req, res)=>{
	try {
		const commentData = await Comment.update({
			content: req.body.content
		},
		{
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
				post_id: req.body.post_id
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

router.delete('/:id', authenticate, async(req,res)=>{
	try{
		const commentData = await Comment.destroy({
			where:{
				id: req.params.id,
				user_id: req.session.user_id,
				post_id: req.body.post_id
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