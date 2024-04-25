import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MedicineData } from '../models-dashboard/medicine-data';
import { MedicineDataService } from '../services/medicine-data.service';

@Component({
  selector: 'app-medicine-details',
  standalone: true,
  imports: [],
  templateUrl: './medicine.component.html',
  styleUrl: './medicine.component.css'
})
export class MedicineComponent {

  medicineData: MedicineData[] = [];

  constructor(
    private toastr: ToastrService,
    private medicineDataService: MedicineDataService
  ) {
    this.loadMedicineData();
  }

  loadMedicineData() {
    this.medicineDataService.getMedicineData().subscribe(medicineData => {
      this.medicineData = medicineData;
      console.log("Medicine Data: ", medicineData);
    });
  }

}
