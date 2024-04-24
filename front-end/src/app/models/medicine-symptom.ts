export class MedicineSymptom { 
    private id: MedicineSymptomId;

    constructor(id?: MedicineSymptomId) {
        this.id = id || new MedicineSymptomId(0, 0);
    }

    get Id() {
        return this.id;
    }

    set Id(value: MedicineSymptomId) {
        this.id = value;
    }
}

export class MedicineSymptomId {

    private medicineId: number = 0;
    private symptomId: number = 0;

    constructor(medicineId?: number, symptomId?: number) {
        this.medicineId = medicineId || 0;
        this.symptomId = symptomId || 0;
    }

    get MedicineId() {
        return this.medicineId;
    }

    set MedicineId(value: number) {
        this.medicineId = value;
    }

    get SymptomId() {
        return this.symptomId;
    }

    set SymptomId(value: number) {
        this.symptomId = value;
    }
}