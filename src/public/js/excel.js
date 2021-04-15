import ExcelController from './controllers/excel.controller.js'
const ex = new ExcelController()

//APIS
const API = 'http://localhost:5000'
const API_PACIENTE = `${API}/api/admin/pacientes`
const API_ADMIN = `${API}/api/admin/admins`
const API_SUPER = `${API}/api/admin/supervisor`
const API_USER = `${API}/api/admin/users`

//Export to excel
try {
    document.getElementById('paciente_excel').addEventListener('click', () => {
        ex.GetData(API_PACIENTE, 'pacientes')
    })
} catch (error) { }

try {
    document.getElementById('admin_excel').addEventListener('click', () => {
        ex.GetData(API_ADMIN, 'admins')
    })
} catch (error) { }

try {
    document.getElementById('super_excel').addEventListener('click', () => {
        ex.GetData(API_SUPER, 'supervisores')
    })
} catch (error) { }

try {
    document.getElementById('user_excel').addEventListener('click', () => {
        ex.GetData(API_USER, 'usuarios')
    })
} catch (error) { }

try {
    const id = document.getElementById('identificador')
    const API_ANTE = `${API}/api/admin/pacientes/antecedentes/${id.innerText}`

    document.getElementById('ante_excel').addEventListener('click', () => {
        ex.GetData(API_ANTE, 'antecedentes')
    })
} catch (error) { }