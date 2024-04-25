import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MedicineSymptom, MedicineSymptomId } from '../models/medicine-symptom';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class MedicineSymptomService {

  private apiUrl = environment.apiUrl + environment.endpoints.medicineSymptoms;
  private medicineSymptomsSubject = new BehaviorSubject<MedicineSymptom[]>([]);
  medicineSymptom$: Observable<MedicineSymptom[]> = this.medicineSymptomsSubject.asObservable();

  constructor(private http: HttpClient) {
    //this.loadInitialData();
  }

  private loadInitialData() {
    console.log("Loading MedicineSymptoms: URL = ", this.apiUrl)
    this.http.get<MedicineSymptom[]>(this.apiUrl).subscribe(medicineSymptoms => {
      console.log("Loaded MedicineSymptoms: ", medicineSymptoms);
      this.medicineSymptomsSubject.next(medicineSymptoms);
    });
  }

  getMedicineSymptoms() {
    return this.medicineSymptom$;
  }

  getMedicineSymptom(id: MedicineSymptomId) {
    return this.http.get<MedicineSymptom>('${this.apiUrl}/${id.medicineId}/${id.symptomId}');
  }

  addMedicineSymptom(medicineSymptom: MedicineSymptom) {
    return this.http.post<MedicineSymptom>('${this.apiUrl}/add', medicineSymptom).pipe(tap(medicineSymptom => {
      const currentMedicineSymptoms = this.medicineSymptomsSubject.value;
      this.medicineSymptomsSubject.next([...currentMedicineSymptoms, medicineSymptom])
    }));
  }

  updateMedicineSymptom(medicineSymptom: MedicineSymptom) {
    return this.http.put<MedicineSymptom>('${this.apiUrl}/update', medicineSymptom).pipe(tap(updated => {
      const currentMedicineSymptoms = this.medicineSymptomsSubject.value;
      const index = currentMedicineSymptoms.findIndex(medicineSymptom => 
        medicineSymptom.Id.MedicineId === updated.Id.MedicineId && 
        medicineSymptom.Id.SymptomId === updated.Id.SymptomId);
      currentMedicineSymptoms[index] = updated;
      this.medicineSymptomsSubject.next([...currentMedicineSymptoms]);
    }));
  }

  deleteMedicineSymptom(id: MedicineSymptomId) {
    return this.http.delete<MedicineSymptom>('${this.apiUrl}/delete/${id.medicineId}/${id.symptomId}').pipe(tap(() => {
      const currentMedicineSymptoms = this.medicineSymptomsSubject.value.filter(medicineSymptom => 
        medicineSymptom.Id.MedicineId !== id.MedicineId && 
        medicineSymptom.Id.SymptomId !== id.SymptomId);
      this.medicineSymptomsSubject.next(currentMedicineSymptoms);
    }));
  }
}