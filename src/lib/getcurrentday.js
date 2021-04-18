const moment = require('moment-timezone')

module.exports = () => {
    const hoy = moment()
    hoy.tz('America/Mexico_City').format('ha z');
    const mes = hoy.month()
    const year = hoy.year()
    const dia = hoy.date()

    let fecha = ``

    if (mes < 10) {
        fecha = `${year}-0${mes+1}-${dia}`
    } else {
        fecha = `${year}-${mes}-${dia}`
    }

    return fecha
}