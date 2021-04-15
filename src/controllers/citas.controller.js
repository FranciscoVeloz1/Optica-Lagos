const pool = require('../lib/database')

class CitasController {
    Listar(req, res) {
        res.render('citas/citas')
    }

    ListarAdd(req, res) {
        res.render('citas/add')
    }
}

module.exports = new CitasController()