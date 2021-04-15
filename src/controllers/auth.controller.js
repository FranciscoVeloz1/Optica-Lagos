const passport = require("passport");
const pool = require('../lib/database');
const helpers = require('../lib/helpers');

class AuthController {
    //Login
    RenderLogin(req, res) {
        res.render('auth/login');
    }

    Login(req, res, next) {
        passport.authenticate('local.signin', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }

    Logout(req, res) {
        req.logOut();
        res.redirect('login');
    }

    //Signup
    RenderSignup(req, res) {
        res.render('auth/signup');
    }

    Signup(req, res) {
        passport.authenticate('local.signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true,
        })(req, res)
    }
}

module.exports = AuthController;