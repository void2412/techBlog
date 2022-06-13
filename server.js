const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const sequelize = require('./config/connection')

const app = express()
const port = process.env.PORT || 80

const hbs = handlebars.create({})







sequelize.sync({force: false}).then(() => {
	app.listen(port, () => console.log(`Listening at port ${port}`))
})