const pool = require('../lib/database')

class ProfileController {
    Listar(req, res) {
        res.render('profile/profile')
    }
}

module.exports = new ProfileController()