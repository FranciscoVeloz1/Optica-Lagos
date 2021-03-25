const pool = require('../lib/database')

class PacienteController {
    
    Listar(req, res) {
        const paciente = pool.query('select * from pacientes')
        res.render('pacientes/pacientes', { paciente })
    }
}

module.exports = new PacienteController();