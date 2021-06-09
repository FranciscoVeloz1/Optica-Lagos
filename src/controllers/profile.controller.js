const pool = require('../lib/database')

class ProfileController {
    Listar(req, res) {
        res.render('profile/profile')
    }

    //Editar perfil
    async RenderEdit(req, res) {
        const { id_user } = req.user;
        console.log(req.user)
        const user = await pool.query('select * from user where id_user = ?', [id_user])
        try {
            if (user[0].id_user == id_user) {
                res.render('profile/edit', { user: user[0] })
            }
        } catch (error) {
            req.flash('message', 'No existe este perfil')
            res.redirect('/profile')
        }
    }
    async Edit(req, res){
        const { id_user } = req.user;
        const user = await pool.query('select * from user where id_user = ?', [id_user])
        
        try {
            const {user, fullname, email, password, role } = req.body

            const newPerfil = {
                user,
                fullname,
                email,
                password,
                role,
            }

            await pool.query('update user set ? where id_user = ?', [newPerfil, id_user])
            req.flash('success', 'Perfil editado con exito')
            res.redirect('/profile')
        } catch (error) {
            req.flash('message', 'No se pudo editar el perfil')
            res.redirect('/profile/edit/' + id_user)
        }
    }
}



module.exports = new ProfileController()