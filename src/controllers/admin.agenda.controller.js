const pool = require('../lib/database')

class AgendaController {
    async List(req, res) {
        const citas = await pool.query('select c.id_cita, u.fullname, u.email, c.fecha, c.hora from cita c, user u where c.fk_user = u.id_user')
        res.render('agenda/agenda', { citas })
    }
}

module.exports = new AgendaController()