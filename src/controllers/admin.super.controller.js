const pool = require('../lib/database')

class SuperController {

    //Listar supervisores
    async List(req, res) {
        const supervisor = await pool.query('select * from user where role = "supervisor"')
        res.render('users/super', { supervisor });
    }

    //Renderizar formulario de edicion
    async RenderEditSuper(req, res) {
        const { id } = req.params;
        const user = await pool.query('select * from user where id_user = ?', [id]);
        res.render('users/editSuper', { user: user[0] });
    }

    //Editar supervisor
    async EditSuper(req, res) {
        const { id } = req.params;
        const { user, fullname, email, role } = req.body;

        try {
            if (user !== "" && fullname !== "" && email !== "" && role !== "") {
                const newUser = {
                    user,
                    fullname,
                    email,
                    role
                }

                await pool.query('update user set ? where id_user = ?', [newUser, id]);
                req.flash('success', 'Supervisor actualizado con éxito');
                res.redirect('/admin/supervisor');
            } else {
                req.flash('message', 'Dejaste un campo vacio');
                res.redirect(`/admin/supervisor/edit/${id}`);
            }
        } catch (error) {
            req.flash('message', 'No se pudo editar el supervisor' + error);
            res.redirect(`/admin/supervisor/edit/${id}`);
        }
    }

    //Eliminar usuario
    async DeleteAdmin(req, res) {
        const { id } = req.params;
        await pool.query('delete from user where id_user = ?', [id])
        req.flash('success', 'Supervisor eliminado con éxito');
        res.redirect('/admin/supervisor');
    }
}

module.exports = new SuperController();