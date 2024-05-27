import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { Medicine } from '../../models/medicine';
import { Symptom } from '../../models/symptom';
import { map } from 'rxjs';
import { MedicineSymptomService } from '../../services/medicine-symptom.service';

@Component({
  selector: 'app-medicine-card',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    RouterModule
  ],
  templateUrl: './medicine-card.component.html',
  styleUrl: './medicine-card.component.css',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class MedicineCardComponent {

  @Input() medicine!: Medicine;
 
  constructor(
    private router: Router,
    private medicineSymptomService: MedicineSymptomService
  ) { }

  ngOnInit() { }

  onLoadMedicineDetails(medicine: Medicine): void { 

    var symptoms: Symptom[] = [];

    this.medicineSymptomService.getSymptomsByMedicineId(medicine.Id).subscribe({
      next: (symptomData: Symptom[]) => {
        symptoms = symptomData.map(symptom =>
          new Symptom(symptom['id'], symptom['description'])
        );
        this.router.navigate(['/medicine-details'], {state: {medicineData: medicine, symptomData: symptoms, mode: "view"}});
      },
      error: (error) => {
        console.error("Error loading symptoms: ", error);
      }
    });
  }

  ngOnDestroy() { }
}