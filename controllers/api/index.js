const router = require('express').Router()
const userRoutes = require('./userRoutes')
const postRoutes = require('./postRoutes')
const commentRoutes = require('./commentRoutes')


router.use('/user', userRoutes)


module.exports = router