const path = require('path')
const express = require('express')
const session = require('express-session')
const {Comment, Post, User} = require('./models/relationship')
const route = require('./controllers')

const handlebars = require('express-handlebars')
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const port = process.env.PORT || 3001

// TODO might need to add helper file for handlebar
const hbs = handlebars.create({})

// TODO check for parameter, might need config for login/idle
const sess = {
	secret: process.env.session_secret,
	cookie: {
		maxAge: 1000 * 60 * 3
	},
	resave: false,
	saveUninitialized: false,
	store: new SequelizeStore({
		db:sequelize
	})
}

app.use(session(sess))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(route)


sequelize.sync({force: false}).then(() => {
	app.listen(port, () => console.log(`Listening at port ${port}`))
})