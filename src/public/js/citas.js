const fecha = document.getElementById('fecha')
const hora = document.getElementById('hora')

const horarios = ['10:00', '10:50', '11:30', '12:20', '13:00']

const API = 'http://localhost:5000'
const API_CITAS = `${API}/api/citas`

fecha.addEventListener('change', async () => {
    hora.innerHTML = ''
    hora.innerHTML += await getCitas(fecha);
})

const getCitas = async input => {
    let r = ''
    const response = await fetch(API_CITAS)
    const citas = await response.json()
    for (let i = 0; i < citas.length; i++) {
        const cita = citas[i];
        if (cita.fecha == input.value) {
            for (let j = 0; j < horarios.length; j++) {
                const horario = horarios[j]
                if (cita.hora !== horario) {
                    r += `<option>${horario}</option>`
                }
            }
        } else {
            for (let j = 0; j < horarios.length; j++) {
                const horario = horarios[j];
                r += `<option>${horario}</option>`
            }
        }
    }

    return r
}