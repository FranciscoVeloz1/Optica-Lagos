const fecha = document.getElementById('fecha')
const hora = document.getElementById('hora')

const API = 'http://localhost:5000'
// const API = 'https://optica-lagos.herokuapp.com'


const API_CITAS = `${API}/api/citas`

fecha.addEventListener('change', async () => {
    hora.innerHTML = ''
    hora.innerHTML += await getCitas(fecha);
})

const getCitas = async input => {
    let res = ''
    let h = ['10:00', '10:50', '11:30', '12:20', '13:00']
    let ocupado = []
    let libre = []
    const response = await fetch(API_CITAS)
    const citas = await response.json()

    citas.forEach(c => {
        for (const hora of h) {
            if (input.value == c.fecha) {
                if (hora == c.hora) {
                    ocupado.push(hora)
                }
            }
        }
    })

    h = h.filter(hora => {
        let r

        for (const ocu of ocupado) {
            if (hora == ocu) {
                r = false
                return r
            } else {
                r = true
            }
        }

        return r
    })

    if (h.length == 0) {
        let newH = ['10:00', '10:50', '11:30', '12:20', '13:00']
        for (const hour of newH) {
            res += `<option>${hour}</option>`
        }
    } else {
        for (let i = 0; i < h.length; i++) {
            const hora = h[i];
            res += `<option>${hora}</option>`
        }
    }

    // if (h.length == 0) {
    //     let newH = ['10:00', '10:50', '11:30', '12:20', '13:00']
    //     for (const hour of newH) {
    //         res += `<option>${hour}</option>`
    //     }
    // } else {
    //     for (let i = 0; i < h.length; i++) {
    //         const hora = h[i];
    //         res += `<option>${hora}</option>`
    //     }
    // }

    return res
}