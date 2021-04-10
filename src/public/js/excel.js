import ExcelController from './controllers/excel.controller.js'
const ex = new ExcelController()

//APIS
const API = 'http://localhost:5000'
const API_PACIENTE = `${API}/api/admin/pacientes`
const API_ADMIN = `${API}/api/admin/admins`

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