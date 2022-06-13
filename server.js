const path = require('path')
const express = require('express')
const {Comment, Post, User} = require('./models/relationship')
// const handlebars = require('express-handlebars')
const sequelize = require('./config/connection')

const app = express()
const port = process.env.PORT || 3001

// const hbs = handlebars.create({})




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


sequelize.sync({force: false}).then(() => {
	app.listen(port, () => console.log(`Listening at port ${port}`))
})