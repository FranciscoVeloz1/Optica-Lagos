const pool = require('../lib/database')

class OrdenController {
    List(req, res) {
        const orden = pool.query('select * from orden')
        res.render('orden/orden', {orden})
    }
}

module.exports = new OrdenController();