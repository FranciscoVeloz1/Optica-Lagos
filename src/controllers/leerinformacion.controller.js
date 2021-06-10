class LeerinformacionController {
    async Muestra(req, res) {
        res.render('leerinformacion/leerinformacion')
    }
}
module.exports = new LeerinformacionController();