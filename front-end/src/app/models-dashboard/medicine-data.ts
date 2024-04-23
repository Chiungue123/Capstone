import { Medicine } from '../models/medicine';
import { Symptom } from '../models/symptom';
import { MedicineSymptomId } from '../models/medicine-symptom';

export class MedicineData {
    private id: MedicineSymptomId;
    private medicine: Medicine;
    private symptom: Symptom;

    constructor(id?: MedicineSymptomId, medicine?: Medicine, symptom?: Symptom) {
        this.id = id || new MedicineSymptomId(0, 0);
        this.medicine = medicine || new Medicine();
        this.symptom = symptom || new Symptom();
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

    set Medicine(value: Medicine) {
        this.medicine = value;
    }

    get Symptom() {
        return this.symptom;
    }

    set Symptom(value: Symptom) {
        this.symptom = value;
    }
}