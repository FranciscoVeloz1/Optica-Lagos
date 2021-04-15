const pool = require('../lib/database')

class ProfileController {
    Listar(req, res) {
        console.log(req.user)
        res.render('profile/profile')
    }
}

module.exports = new ProfileController()