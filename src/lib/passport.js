const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('./database');
const helpers = require('./helpers');

//SIGNIN
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const rows = await pool.query('select * from user where email = ?', [email]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);

        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.user));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario no existe.'));
    }
}));

//SIGNUP
passport.use('local.signup', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, user, password, done) => {
    const { fullname, email, passwords } = req.body;
    const userData = await pool.query('select user, email from user');

    for (const users of userData) {
        if (users.user == user) {
            return done(null, false, req.flash('message', 'El usuario que ingresaste ya existe'));
        }

        if (users.email == email) {
            return done(null, false, req.flash('message', 'El email que ingresaste ya existe'));
        }
    }
    try {
        if (fullname == "" || email == "" || passwords == "") {
            return done(null, false, req.flash('message', 'Dejaste un campo vacio'));
        } else {
            if (password == passwords) {
                let newUser = {
                    user,
                    fullname,
                    email,
                    password,
                    role: 'user'
                }
                newUser.password = await helpers.encryptPassword(password);

                // Saving in the Database
                const result = await pool.query('insert into user set ?', [newUser]);
                newUser.id_user = result.insertId;
                return done(null, newUser, req.flash('success', `Bienvenido ${user}`));
            } else {
                return done(null, false, req.flash('message', 'Las contraseñas no coinciden'));
            }
        }

    } catch (error) {
        return done(null, false, req.flash('message', 'No se pudo registrar el usuario ' + error));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id_user);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM user WHERE id_user = ?', [id]);
    done(null, rows[0]);
});