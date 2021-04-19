const pool = require('../lib/database')
const { getCurrentDay, getNextDay } = require('../lib/getcurrentday')

class CitasController {
    async Listar(req, res) {
        const cita = await pool.query('select * from cita where fk_user = ?', [req.user.id_user])
        res.render('citas/citas', { cita })
    }

    async ListarAdd(req, res) {
        const cita = await pool.query('select * from cita where fk_user = ?', [req.user.id_user])
        const citas = await pool.query('select * from cita')
        console.log(citas)
        const day = getNextDay()
        if (cita.length > 0) {
            req.flash('message', 'No puedes agendar mas de una cita');
            res.redirect('/user/citas')
        } else {
            res.render('citas/add' , { day })
        }
    }

    async AgendarCita(req, res) {
        const { fecha, hora } = req.body
        const cita = await pool.query('select * from cita')

        const newCita = {
            fk_user: req.user.id_user,
            fecha,
            hora
        }

        for (const c of cita) {
            if (c.fecha == fecha && c.hora == hora) {
                req.flash('message', 'Fecha y horario ocupado');
                res.redirect('/user/citas/add')
                return
            }
        }

        if (fecha !== getCurrentDay()) {
            // await pool.query('insert into cita set ?', [newCita])
            console.log(newCita)
            req.flash('success', 'Cita agendada con exito');
            res.redirect('/user/citas')
        } else {
            req.flash('message', 'No se puede agendar el dia de hoy');
            res.redirect('/user/citas/add')
        }
    }

    async DeleteCita(req, res) {
        const { id } = req.params
        const cita = await pool.query('select * from cita where id_cita = ?', [id])

        try {
            if (cita[0].fk_user == req.user.id_user) {
                await pool.query('delete from cita where id_cita = ?', [id])
                req.flash('success', 'Cita eliminada con exito');
                res.redirect('/user/citas')
            } else {
                req.flash('message', 'Esta cita no te pertenece');
                res.redirect('/user/citas')
            }
        } catch (error) {
            req.flash('message', 'Esta cita no existe');
            res.redirect('/user/citas')
        }

    }
}

module.exports = new CitasController()