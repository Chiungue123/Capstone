import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { MedicineSymptom, MedicineSymptomId } from '../models/medicine-symptom';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Symptom } from '../models/symptom';

@Injectable({ providedIn: 'root' })

export class MedicineSymptomService {

  private apiUrl = `${environment.apiUrl}${environment.endpoints.medicineSymptoms}`;
  private medicineSymptomsSubject = new BehaviorSubject<MedicineSymptomId[]>([]);
  medicineSymptom$: Observable<MedicineSymptomId[]> = this.medicineSymptomsSubject.asObservable();

  constructor(private http: HttpClient) { }

  private loadInitialData(): Observable<MedicineSymptomId[]> {
    return this.http.get<MedicineSymptomId[]>(this.apiUrl);
  }

  getMedicineSymptoms() {
    return this.loadInitialData().pipe(
      tap(medicineSymptoms => {
        this.medicineSymptomsSubject.next(medicineSymptoms);
      }),
      switchMap(() => this.medicineSymptom$)
    );
  }

  getMedicineSymptom(id: MedicineSymptomId) {
    return this.http.get<MedicineSymptomId>(`${this.apiUrl}/${id.MedicineId}/${id.SymptomId}`);
  }

  getSymptomsByMedicineId(medicineId: Number): Observable<Symptom[]> {
    return this.http.get<Symptom[]>(`${this.apiUrl}/medicine/${medicineId}`);
  }

  addMedicineSymptoms(medicineSymptoms: MedicineSymptomId[]) {
    return this.http.post<MedicineSymptomId>(`${this.apiUrl}/add`, medicineSymptoms).pipe(tap(medicineSymptom => {
      const currentMedicineSymptoms = this.medicineSymptomsSubject.value;
      this.medicineSymptomsSubject.next([...currentMedicineSymptoms, medicineSymptom])
    }));
  }

  deleteMedicineSymptoms(medicineSymptoms: MedicineSymptomId[]) {
    return this.http.delete<MedicineSymptomId>(`${this.apiUrl}/delete`, { body: medicineSymptoms }).pipe(tap(() => {
      const currentMedicineSymptoms = this.medicineSymptomsSubject.value.filter(ms => 
        !medicineSymptoms.some(deletedMedicineSymptom => deletedMedicineSymptom.MedicineId === ms.MedicineId && deletedMedicineSymptom.SymptomId === ms.SymptomId)
      );
      this.medicineSymptomsSubject.next(currentMedicineSymptoms);
    }));
  }
}