import { Injectable } from '@angular/core';
import { SymptomService } from './symptom.service';
import { MedicineService } from './medicine.service';
import { MedicineSymptomService } from './medicine-symptom.service';
import { MedicineSymptom, MedicineSymptomId } from '../models/medicine-symptom';
import { MedicineData } from '../models-dashboard/medicine-data';
import { BehaviorSubject, Observable, catchError, forkJoin, map, take, tap, throwError } from 'rxjs';
import { Symptom } from '../models/symptom';
import { Medicine } from '../models/medicine';

@Injectable({ providedIn: 'root' })

export class MedicineDataService {

  private medicineDataSubject = new BehaviorSubject<MedicineData[]>([]);
  public medicineData$: Observable<MedicineData[]> = this.medicineDataSubject.asObservable();

  constructor(
    private idService: MedicineSymptomService,
    private symptomService: SymptomService,
    private medicineService: MedicineService
  ) { 
    this.loadInitialData();
  }

  private loadInitialData() {
    this.idService.getMedicineSymptoms().subscribe(medicineSymptoms => {
      const requests = medicineSymptoms.map(medicineSymptom => {

        return forkJoin({
          medicine: this.medicineService.getMedicine(medicineSymptom.Id.MedicineId),
          symptom: this.symptomService.getSymptom(medicineSymptom.Id.SymptomId)
          
        }).pipe(
          map(({ medicine, symptom }) => new MedicineData(medicineSymptom.Id, [medicine], [symptom]))
        );
      });

      forkJoin(requests).subscribe(completedRequests => {
        this.medicineDataSubject.next(completedRequests);
        console.log("Loaded Medicine Data: ", completedRequests);
      });
    });
  }

  getMedicineData() {
    return this.medicineData$;
  }

  getMedicineDataById(medicineId: Number, symptomId: Number) {
    this.medicineData$.pipe(
      map(medicineData => medicineData.find(data => 
        data.Id.MedicineId === medicineId && data.Id.SymptomId === symptomId)
      )
    );
  }

  addMedicineData(medicine: Medicine, symptom: Symptom) {
    // Check if the MedicineData already exists
    this.medicineData$.pipe(
      take(1),
      map(medicineData => {
        if (medicineData.some(data => 
          data.Id.MedicineId === medicine.Id && data.Id.SymptomId === symptom.Id)) {
            throw new Error("Duplicate Medicine Data exists.");
        } else {
          console.log("No Duplicate Medicine Data Found. Adding new data..");
          let newId = new MedicineSymptomId(medicine.Id, symptom.Id);
          
          this.idService.addMedicineSymptom(new MedicineSymptom(newId)).pipe(
            tap(newMedicineSymptom => {
              medicineData.push(new MedicineData(newMedicineSymptom.Id, [medicine], [symptom]));
              this.medicineDataSubject.next(medicineData);
            })
          );
        }
      }),
      catchError(error => {
        console.error("Error adding Medicine Data: ", error);
        return throwError(() => new Error("Error adding Medicine Data: " + error.message));
      })
    ).subscribe();
  }

  updateMedicineData() {}

  removeMedicineData(medicineSymptom: MedicineSymptom) {
    this.idService.deleteMedicineSymptom(medicineSymptom.Id).subscribe(() => {

      const currentMedicineData = this.medicineDataSubject.value.filter(data => 
        data.Id.MedicineId !== medicineSymptom.Id.MedicineId && 
        data.Id.SymptomId !== medicineSymptom.Id.SymptomId);

      this.medicineDataSubject.next(currentMedicineData);
    });
  }

  generateTestData() {
    const medicineData = [
      new MedicineData(new MedicineSymptomId(1, 1), 
        [new Medicine(1, "Medicine 1", "Description 1", 8)],
        [new Symptom(1, "Symptom 1")]),

      new MedicineData(new MedicineSymptomId(2, 2), 
        [new Medicine(2, "Medicine 2", "Description 2", 27)],
        [new Symptom(2, "Symptom 2")]),

      new MedicineData(new MedicineSymptomId(3, 3), 
        [new Medicine(3, "Medicine 3", "Description 3", 19)],
        [new Symptom(3, "Symptom 3")]),
    ];
    
    console.log("Medicine Data Service Test Data: ", medicineData)
    this.medicineDataSubject.next(medicineData);
  }
}