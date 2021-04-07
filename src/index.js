//Dependencies
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const exphbs = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const MySQLStore = require('express-mysql-session')(session)
require('dotenv').config()

//Variables statements
const { database } = require('./config/keys')

//Initializations
const app = express()
require('./lib/passport')

//Settings
app.set('port', process.env.PORT || 5000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//Global variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message')
    app.locals.success = req.flash('success')
    app.locals.user = req.user
    next()
})

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use(require('./routes/index.route'));
app.use(require('./routes/auth.route'));

//Admin routes
app.use(require('./routes/admin.dash.route'));
app.use(require('./routes/admin.admin.route'));
app.use(require('./routes/admin.super.route'));
app.use(require('./routes/admin.user.route'));
app.use(require('./routes/admin.paciente.route'));
app.use(require('./routes/admin.antecedente.route'));

//Starting
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})