import { Medicine } from '../models/medicine';
import { Symptom } from '../models/symptom';

export class MedicineSymptomId {
    private medicineId: number;
    private symptomId: number;

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

    toString(): string {
        return `MedicineSymptomId [medicineId=${this.medicineId}, symptomId=${this.symptomId}]`;
    }
}

export class MedicineSymptom {
    private id: MedicineSymptomId;
    private medicine: any; // Use the appropriate type for Medicine
    private symptom: any; // Use the appropriate type for Symptom

    constructor(id?: MedicineSymptomId, medicine?: any, symptom?: any) {
        this.id = id || new MedicineSymptomId();
        this.medicine = medicine || null;
        this.symptom = symptom || null;
    }

    get Id() {
        return this.id;
    }

    set Id(value: MedicineSymptomId) {
        this.id = value;
    }

    get Medicine() {
        return this.medicine;
    }

    set Medicine(value: Medicine) { // Use the appropriate type for Medicine
        this.medicine = value;
    }

    get Symptom() {
        return this.symptom;
    }

    set Symptom(value: Symptom) { // Use the appropriate type for Symptom
        this.symptom = value;
    }
}