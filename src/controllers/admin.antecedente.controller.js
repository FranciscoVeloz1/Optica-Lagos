const pool = require('../lib/database')
const Antecedente = require('../models/antedecente')

class AntecedenteController {

    async List(req, res) {
        const { id } = req.params
        const antecedente = await pool.query('select * from v_antePaciente where id_paciente = ?', [id])
        const paciente = await pool.query('select * from pacientes where id_paciente = ?', [id])

        if (antecedente.length > 0) {
            res.render('antecedentes/antecedentes', { antecedente: antecedente[0] })
        } else {
            if (paciente.length > 0) {
                res.render('antecedentes/add', { paciente: paciente[0] })
            } else {
                req.flash('message', 'Este paciente no existe')
                res.redirect('/admin/pacientes')
            }
        }
    }

    //Insertar antecedentes
    async Insert(req, res) {
        const { id } = req.params
        const { diabetes, hipertension, otro, tiempo, lentes, derecho, izquierdo, adiacion } = req.body

        try {
            const antecedente = new Antecedente(id, diabetes, hipertension, otro, tiempo, lentes, derecho, izquierdo, adiacion);
            await pool.query('insert into antecedentes set ?', [antecedente])
            req.flash('success', 'Antecedente guardado con exito')
            res.redirect('/admin/pacientes/antecedentes/' + id)
        } catch (error) {
            req.flash('message', 'Error al guardar los antecedentes')
            res.redirect('/admin/pacientes/antecedentes/' + id)
        }
    }

    //Editar antecedentes
    async RenderEdit(req, res) {
        const { id } = req.params
        const antecedente = await pool.query('select * from antecedentes where id_antecedente = ?', [id])

        try {
            if (id == antecedente[0].id_antecedente) {
                res.render('antecedentes/edit', { antecedente: antecedente[0] })
            }
        } catch (error) {
            req.flash('message', 'Este paciente no existe')
            res.redirect('/admin/pacientes')
        }
    }

    async Editar(req, res) {
        const { id } = req.params
        const { diabetes, hipertension, otro, tiempo, lentes, derecho, izquierdo, adiacion } = req.body
        const p = await pool.query('select * from antecedentes where id_antecedente = ?', [id])

        try {
            const antecedente = new Antecedente(p[0].fk_paciente, diabetes, hipertension, otro, tiempo, lentes, derecho, izquierdo, adiacion);
            await pool.query('update antecedentes set ? where id_antecedente = ?', [antecedente, id])
            req.flash('success', 'Antecedente guardado con exito')
            res.redirect('/admin/pacientes/antecedentes/' + p[0].fk_paciente)
        } catch (error) {
            req.flash('message', 'No se pudo editar el antecedente ' + error)
            res.redirect('/admin/pacientes/antecedentes/' + p[0].fk_paciente)
        }
    }

    //Eliminar antecedentes
    async Eliminar(req, res) {
        const { id } = req.params
        const antecedente = await pool.query('select * from antecedentes where id_antecedente = ?', [id])

        try {
            if (id == antecedente[0].id_antecedente) {
                await pool.query('delete from antecedentes where id_antecedente = ?', [id])
                req.flash('success', 'Antecedentes eliminados con exito')
                res.redirect('/admin/pacientes')
            }
        } catch (error) {
            req.flash('message', 'Este paciente no existe')
            res.redirect('/admin/pacientes')
        }
    }

    ///////////////////////////////////// API /////////////////////////////////////
    async ListAPI(req, res) {
        try {
            const { id } = req.params
            const antecedente = await pool.query('select * from v_antePaciente where id_antecedente = ?', [id])
            res.json(antecedente)
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = new AntecedenteController()