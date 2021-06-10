const pool = require('../lib/database')

class AgendaController {
    async List(req, res) {
        const citas = await pool.query('select c.id_cita, u.fullname, u.email, c.fecha, c.hora from cita c, user u where c.fk_user = u.id_user')
        res.render('agenda/agenda', { citas })
    }

    //Eliminar agenda
    async Delete(req, res) {
        const { id } = req.params
        const cita = await pool.query('select * from cita where id_cita = ?', [id])

        try {
            if (id == cita[0].id_cita) {
                await pool.query('delete from cita where id_cita = ?', [id])
                req.flash('success', 'Cita eliminada con exito')
                res.redirect('/admin/citas')
            }
        } catch (error) {
            req.flash('message', 'No se pudo eliminar la cita')
            res.redirect('/admin/citas')
        }
    }

}

module.exports = new AgendaController()