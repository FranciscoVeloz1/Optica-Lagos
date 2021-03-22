const pool = require('../lib/database')

class AdminController {

    //Renderizar administradores
    async List(req, res) {
        const admin = await pool.query('select * from user where role = "admin"')
        res.render('users/admin', { admin });
    }

    //Renderizar formulario para edicion de administradores
    async RenderEditAdmin(req, res) {
        const { id } = req.params;
        const user = await pool.query('select * from user where id_user = ?', [id]);
        res.render('users/editAdmin', { user: user[0] });
    }

    //Editar administrador
    async EditAdmin(req, res) {
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
                req.flash('success', 'Administrador actualizado con éxito');
                res.redirect('/admin/admins');
            } else {
                req.flash('message', 'Dejaste un campo vacio');
                res.redirect(`/admin/admins/edit/${id}`);
            }
        } catch (error) {
            req.flash('message', 'No se pudo editar el administrador');
            res.redirect(`/admin/admins/edit/${id}`);
        }
    }

    //Eliminar usuario
    async DeleteAdmin(req, res) {
        const { id } = req.params;
        await pool.query('delete from user where id_user = ?', [id])
        req.flash('success', 'Administrador eliminado con éxito');
        res.redirect('/admin/admins');
    }
}

module.exports = new AdminController();