class DashController {
    List(req, res) {
        res.render('dashboard/dashboard');
    }
}

module.exports = new DashController();