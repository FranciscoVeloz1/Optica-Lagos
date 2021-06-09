class LeerController {
    async Mostrar(req, res) {
        res.render('leer/leer')
    }
}
module.exports = new LeerController();