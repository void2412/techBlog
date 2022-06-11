const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const sqlCon = require('./config/connection')

const app = express()
const port = process.env.PORT || 80

const hbs = handlebars.create({})

