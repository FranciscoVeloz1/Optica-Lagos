class ExcelController {
    constructor() {
        this.EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        this.EXCEL_EXTENSION = '.xlsx';
    }

    SaveAsExcel(buffer, filename) {
        const data = new Blob([buffer], { type: this.EXCEL_TYPE });
        saveAs(data, filename + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
    }

    async GetData(api, title) {
        const response = await fetch(api);
        const data = await response.json();

        if (data.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = {
                Sheets: {
                    'data': worksheet
                },
                SheetNames: ['data']
            };

            const excelBuffer = XLSX.write(workbook, { booktype: 'xlsx', type: 'array' });
            this.SaveAsExcel(excelBuffer, title)
        }
    }
}

export default ExcelController