const path = require('path')
const express = require('express')
const session = require('express-session')
const {Comment, Post, User} = require('./models')
const route = require('./controllers')
const helpers = require('./utils/helpers')
const handlebars = require('express-handlebars')
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const port = process.env.PORT || 3001


const hbs = handlebars.create({ helpers })

const sess = {
	secret: process.env.session_secret,
	cookie: {
		maxAge: 1000 * 60 * 60
	},
	resave: false,
	saveUninitialized: false,
	rolling: true,
	store: new SequelizeStore({
		db:sequelize
	})
}

app.use(session(sess))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(route)


sequelize.sync({force: false}).then(() => {
	app.listen(port, () => console.log(`Listening at port ${port}`))
})