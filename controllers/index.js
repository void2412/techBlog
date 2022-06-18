const router = require('express').Router()

const apiRouter = require('./api')
const homeRouters = require('./homeRoutes')

router.use('/', homeRouters)
// router.use('/api', apiRouter)

module.exports = router