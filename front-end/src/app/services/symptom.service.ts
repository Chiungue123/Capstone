import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Symptom } from '../models/symptom';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class SymptomService {

  private apiUrl = `${environment.apiUrl}${environment.endpoints.symptoms}`;
  private symptomsSubject = new BehaviorSubject<Symptom[]>([]);
  symptom$: Observable<Symptom[]> = this.symptomsSubject.asObservable();

  constructor(private http: HttpClient) { }

   private loadSymptomData(): Observable<Symptom[]> {
     return this.http.get<Symptom[]>(this.apiUrl)
   }

   getSymptoms() {
     return this.loadSymptomData().pipe(
      tap(symptoms => {
        this.symptomsSubject.next(symptoms);
      }),
      switchMap(() => this.symptom$)
      );
   }

   getSymptom(id: Number) {
     return this.http.get<Symptom>(`${this.apiUrl}/${id}`);
   }

   addSymptom(symptom: Symptom) {
    return this.http.post<Symptom>(`${this.apiUrl}/add`, symptom).pipe(tap(symptom => {
      const currentSymptoms = this.symptomsSubject.value;
      this.symptomsSubject.next([...currentSymptoms, symptom])
    }))
   }

   updateSymptom(symptom: Symptom) {
    return this.http.put<Symptom>(`${this.apiUrl}/update`, symptom).pipe(tap(updated => {
      const currentSymptoms = this.symptomsSubject.value;
      const index = currentSymptoms.findIndex(symptom => symptom.Id === updated.Id);
      currentSymptoms[index] = updated;
      this.symptomsSubject.next(currentSymptoms);
    }))
   }

   deleteSymptom(id: Number) {
    return this.http.delete<Symptom>(`${this.apiUrl}/delete/${id}`).pipe(tap(() => {
      const currentSymptoms = this.symptomsSubject.value.filter(symptom => symptom.Id !== id);
      this.symptomsSubject.next(currentSymptoms);
    }));
   }
}
