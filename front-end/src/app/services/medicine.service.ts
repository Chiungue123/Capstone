import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Medicine } from '../models/medicine';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class MedicineService {

  private apiUrl = environment.apiUrl + environment.endpoints.medicines;
  private medicinesSubject = new BehaviorSubject<Medicine[]>([]);
  medicine$: Observable<Medicine[]> = this.medicinesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.http.get<Medicine[]>(this.apiUrl).subscribe(medicines => {
      this.medicinesSubject.next(medicines);   
    });
  }

  getMedicines() {
    return this.medicine$;
  }

  getMedicine(id: Number) {
    return this.http.get<Medicine>('${this.apiUrl}/${id}');
  }

  addMedicine(medicine: Medicine) {
    return this.http.post<Medicine>('${this.apiUrl}/add', medicine).pipe(tap(medicine => {
      const currentMedicines = this.medicinesSubject.value;
      this.medicinesSubject.next([...currentMedicines, medicine])
    }));
  }

  updateMedicine(medicine: Medicine) {
    return this.http.put<Medicine>('${this.apiUrl}/update', medicine).pipe(tap(updated => {
      const currentMedicines = this.medicinesSubject.value;
      const index = currentMedicines.findIndex(medicine => medicine.Id === updated.Id);
      currentMedicines[index] = updated;
      this.medicinesSubject.next([...currentMedicines]);
    }));
  }

  deletelMedicine(id: Number) {
    return this.http.delete('${this.apiUrl}/delete/${id}').pipe(tap(() => {
      const currentMedicines = this.medicinesSubject.value.filter(medicine => medicine.Id !== id);
      this.medicinesSubject.next(currentMedicines);
    }));
  }
}