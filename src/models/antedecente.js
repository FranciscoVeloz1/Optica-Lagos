class Antecedente {
    constructor(fk, diabetes, hiper, otro, tiempo, lentes, der, izq, adi) {
        this.fk_paciente = fk
        this.diabetes = diabetes
        this.hipertension = hiper
        this.otro = otro
        this.tiempo = tiempo
        this.lentes = lentes
        this.derecho = der
        this.izquierdo = izq
        this.adiacion = adi
    }
}

module.exports = Antecedente