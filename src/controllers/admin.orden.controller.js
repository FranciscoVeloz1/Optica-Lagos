const pool = require('../lib/database')

class OrdenController {
    async List(req, res) {
        const orden = await pool.query('select * from v_ordenpaciente')
        res.render('orden/orden', {orden})
    }

    //Insertar ordenes
    RenderAdd(req, res) {
        const { id } = req.params
        console.log(id)
        res.render('orden/add',{id})
    }

    async Insert(req, res) {
        try {
            const { id } = req.params
            const {derecho, izquierdo, addp, material, entrega, precio, anticipo } = req.body
            const fecha = new Date()

            const newOrden = {
                fecha,
                fk_paciente: id,
                derecho,
                izquierdo,
                addp,
                material,
                entrega,
                precio,
                anticipo,
            }

            await pool.query('insert into orden set ?', [newOrden])
            req.flash('success', 'Orden guardada con exito')
            res.redirect('/admin/orden')
        } catch (error) {
            req.flash('message', 'No se pudo registar la orden')
            res.redirect('/admin/orden/add')
        }
    }

    //Editar orden
    async RenderEdit(req, res) {
        const { id } = req.params
        const orden = await pool.query('select * from orden where id_orden = ?', [id])
        try {
            if (orden[0].id_orden == id) {
                res.render('orden/edit', { orden: orden[0] })
            }
        } catch (error) {
            req.flash('message', 'No existe esta orden')
            res.redirect('/admin/orden')
        }
    }
    async Edit(req, res){
        const { id } = req.params
        const orden = await pool.query('select * from orden where id_orden = ?', [id])
        
        try {
            const {derecho, izquierdo, addp, material, entrega, precio, anticipo} = req.body
            const fecha = new Date()

            const newOrden = {
                fecha,
                fk_paciente: orden[0].fk_paciente,
                derecho,
                izquierdo,
                addp,
                material,
                entrega,
                precio,
                anticipo,
            }

            await pool.query('update orden set ? where id_orden = ?', [newOrden, id])
            req.flash('success', 'Orden editada con exito')
            res.redirect('/admin/orden')
        } catch (error) {
            req.flash('message', 'No se pudo editar la orden')
            res.redirect('/admin/orden/edit/' + id)
        }
    }

    //Eliminar orden
    async Delete(req, res) {
        const { id } = req.params
        const orden = await pool.query('select * from orden where id_orden = ?', [id])

        try {
            if (id == orden[0].id_orden) {
                await pool.query('delete from orden where id_orden = ?', [id])
                req.flash('success', 'Orden eliminada con exito')
                res.redirect('/admin/orden')
            }
        } catch (error) {
            req.flash('message', 'No se pudo eliminar la orden')
            res.redirect('/admin/orden')
        }
    }

    ///////////////////////////////////// API /////////////////////////////////////
    async ListAPI(req, res) {
        try {
            const orden = await pool.query('select * from orden')
            res.json(orden)
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = new OrdenController();