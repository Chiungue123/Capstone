import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Symptom } from '../models/symptom';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {

  private apiUrl = '${environment.apiUrl}${environment.endpoints.symptoms}';
  private symptomsSubject = new BehaviorSubject<Symptom[]>([]);
  symptom$: Observable<Symptom[]> = this.symptomsSubject.asObservable();

  constructor() { }
}
