module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },

    isAdminIn(req, res, next) {
        if (req.user.role === 'admin' || req.user.role === 'supervisor') {
            return next();
        }
        return res.redirect('/');
    },
}