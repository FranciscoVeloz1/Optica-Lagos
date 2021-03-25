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
}

module.exports = new PacienteController();