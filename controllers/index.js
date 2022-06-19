const router = require('express').Router()

const apiRouters = require('./api')
const homeRouters = require('./homeRoutes')

router.use('/', homeRouters)
router.use('/api', apiRouters)

module.exports = router