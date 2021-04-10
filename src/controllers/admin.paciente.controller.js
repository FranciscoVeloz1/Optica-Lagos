const pool = require('../lib/database')

class PacienteController {

    async Listar(req, res) {
        const paciente = await pool.query('select * from pacientes')
        res.render('pacientes/pacientes', { paciente })
    }

    //Insertar usuarios
    RenderAdd(req, res) {
        res.render('pacientes/add')
    }

    async Insert(req, res) {
        try {
            const { nombre, apellidop, apellidom, edad, direccion, colonia, telefono } = req.body
            const fecha = new Date()

            const newPaciente = {
                nombre,
                apellidop,
                apellidom,
                edad,
                direccion,
                colonia,
                telefono,
                fecha
            }

            await pool.query('insert into pacientes set ?', [newPaciente])
            req.flash('success', 'Paciente guardado con exito')
            res.redirect('/admin/pacientes')
        } catch (error) {
            req.flash('message', 'No se pudo registar el paciente')
            res.redirect('/admin/pacientes/add')
        }
    }

    //Editar pacientes
    async RenderEdit(req, res) {
        const { id } = req.params
        const paciente = await pool.query('select * from pacientes where id_paciente = ?', [id])
        try {
            if (paciente[0].id_paciente == id) {
                res.render('pacientes/edit', { paciente: paciente[0] })
            }
        } catch (error) {
            req.flash('message', 'No existe este paciente')
            res.redirect('/admin/pacientes')
        }
    }

    async Edit(req, res) {
        const { id } = req.params

        try {
            const { nombre, apellidop, apellidom, edad, direccion, colonia, telefono } = req.body
            const fecha = new Date()

            const newPaciente = {
                nombre,
                apellidop,
                apellidom,
                edad,
                direccion,
                colonia,
                telefono,
                fecha
            }

            await pool.query('update pacientes set ? where id_paciente = ?', [newPaciente, id])
            req.flash('success', 'Paciente editado con exito')
            res.redirect('/admin/pacientes')
        } catch (error) {
            req.flash('message', 'No se pudo editar el paciente')
            res.redirect('/admin/pacientes/edit/' + id)
        }
    }

    //Eliminar pacientes
    async Delete(req, res) {
        const { id } = req.params
        const paciente = await pool.query('select * from pacientes where id_paciente = ?', [id])

        try {
            if (id == paciente[0].id_paciente) {
                await pool.query('delete from pacientes where id_paciente = ?', [id])
                req.flash('success', 'Paciente eliminado con exito')
                res.redirect('/admin/pacientes')
            }
        } catch (error) {
            req.flash('message', 'No se pudo eliminar el paciente')
            res.redirect('/admin/pacientes')
        }
    }

    ///////////////////////////////////// API /////////////////////////////////////
    async ListAPI(req, res) {
        try {
            const paciente = await pool.query('select * from pacientes')
            res.json(paciente)
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = new PacienteController();