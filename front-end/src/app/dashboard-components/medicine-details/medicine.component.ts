import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { Medicine } from '../../models/medicine';
import { Symptom } from '../../models/symptom';
import { SymptomService } from '../../services/symptom.service';
import { Subscription } from 'rxjs';
import { MedicineSymptomService } from '../../services/medicine-symptom.service';
import { MedicineService } from '../../services/medicine.service';
import { MedicineSymptom, MedicineSymptomId } from '../../models/medicine-symptom';

@Component({
  selector: 'app-medicine-details',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule],
  templateUrl: './medicine.component.html',
  styleUrl: './medicine.component.css'
})
export class MedicineComponent implements OnDestroy {

  sub!: Subscription;

  medicineForm!: FormGroup;
  medicine: Medicine = new Medicine();

  allSymptoms: Symptom[] = []; // All Symptoms
  medicineSymptoms: Symptom[] = []; // Symptoms of the Medicine
  nonMedicineSymptoms: Symptom[] = []; // Symptoms not associated with the Medicine

  symptomIdsToRemove: Number[] = [];
  symptomIdsToAdd: Number[] = [];

  isDarkMode: boolean = false;
  isEditMode: boolean = false;
  isAddMode: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private medicineService: MedicineService,
    private symptomService: SymptomService,
    private medicineSymptomService: MedicineSymptomService,
    private fb: FormBuilder
  
  ) {
    this.medicineForm = this.fb.group({});
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as { mode: string, medicineData: Medicine, symptomData: Symptom[] }

      if (state.medicineData && state.symptomData && state.mode) {
        this.medicine = this.convertToMedicine(state.medicineData);
        this.medicineSymptoms = state.symptomData.map(symptom =>
          new Symptom(symptom['id'], symptom['description'])
        );
      }

      console.log("Medicine Data: ", this.medicine)
      console.log("Symptoms Data: ", this.medicineSymptoms)

      if (state.medicineData && state.mode === "view") {
        this.isAddMode = false;
        this.isEditMode = false;
        this.medicineForm = this.updateForm(this.medicine);

      } else if (!state.medicineData && state.mode === "add") {
        this.isAddMode = true;
        this.isEditMode = false;
        this.medicineForm = this.addForm();

      } else if (state.medicineData && state.mode === "edit") {
        this.isAddMode = false;
        this.isEditMode = true;
        this.medicineForm = this.updateForm(this.medicine);
      
      } else {
        console.log("Medicine Data is Undefined, Returning to Dashbaord")
        this.router.navigate(['/dashboard']);
      } 
    }
  }

  ngOnInit() {
    if (localStorage.getItem('darkMode') === 'true') {
      this.isDarkMode = true;
    }
    this.loadAllSymptoms();
  }

  private convertToMedicine(medicine: any): Medicine {
    if (medicine instanceof Medicine) {
      return medicine;
    } else {
      return new Medicine(
        medicine['id'], 
        medicine['name'],
        medicine['price'],
        medicine['brand'],
        medicine['stock']
      );
    }
  }

  loadAllSymptoms() {
    this.sub = this.symptomService.getSymptoms().subscribe({
      next: (symptomData: Symptom[]) => {
        this.allSymptoms = symptomData.map(symptom =>
          new Symptom(symptom['id'], symptom['description'])
        ); 
        this.nonMedicineSymptoms = this.allSymptoms.filter(symptom => 
          !this.medicineSymptoms.some(medicineSymptom => medicineSymptom.id === symptom.id)
        );
      },
      error: (error) => {
        console.error("Error loading symptoms: ", error);
      }
    });
  }

  /*** Form Initialization ***/

  addForm(): FormGroup {
    this.medicineForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      brand: ['', Validators.required],
      stock: ['', Validators.required]
    });

    return this.medicineForm;
  }

  updateForm(medicineData: Medicine): FormGroup {
    this.medicineForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      brand: ['', Validators.required],
      stock: ['', Validators.required]
    });

    this.medicineForm.patchValue({
      name: medicineData.Name,
      price: medicineData.Price,
      brand: medicineData.Brand,
      stock: medicineData.Stock
    });

    return this.medicineForm;
  }

  /*** CRUD Operations ***/

  onAdd(medicine: Medicine) {

    medicine.Name = this.medicineForm.value.name;
    medicine.Price = this.medicineForm.value.price;
    medicine.Brand = this.medicineForm.value.brand;
    medicine.Stock = this.medicineForm.value.stock;

    if (this.validateForm(this.medicineForm)) {
      this.medicineService.addMedicine(medicine).subscribe({
        next: () => {
          this.toastr.success("Medicine Added Successfully");
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.log("Error Adding Medicine: ", error);
        }
      });
    }

    if (this.symptomIdsToAdd.length > 0) {

      let medicineSymptoms: MedicineSymptomId[] = this.symptomIdsToAdd.map(symptomId => {
        return new MedicineSymptomId(medicine.Id, symptomId);
      });

      this.medicineSymptomService.addMedicineSymptoms(medicineSymptoms).subscribe({
        next: () => {},
        error: (error) => console.error("Error Adding Symptoms: ", error)
      });
    }
  }

  onUpdate(medicine: Medicine) {

    if (this.medicineForm.value.name === this.medicine.Name &&
        this.medicineForm.value.price === this.medicine.Price &&
        this.medicineForm.value.brand === this.medicine.Brand &&
        this.medicineForm.value.stock === this.medicine.Stock &&
        this.symptomIdsToRemove.length === 0 &&
        this.symptomIdsToAdd.length === 0
    ) {
      this.toastr.info("No Changes Detected");
      return;
    }

    medicine.Id = this.medicine.Id;
    medicine.Name = this.medicineForm.value.name;
    medicine.Price = this.medicineForm.value.price;
    medicine.Brand = this.medicineForm.value.brand;
    medicine.Stock = this.medicineForm.value.stock;

    if (this.validateForm(this.medicineForm)) {
      this.medicineService.updateMedicine(medicine).subscribe({
        next: () => {
          this.toastr.success("Medicine Updated Successfully");
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => console.log("Error Updating Medicine: ", error)
      });
    }

    if (this.symptomIdsToRemove.length > 0) {
      
      let medicineSymptoms: MedicineSymptomId[] = this.symptomIdsToRemove.map(symptomId => {
        return new MedicineSymptomId(medicine.Id, symptomId);
      });

      this.medicineSymptomService.deleteMedicineSymptoms(medicineSymptoms).subscribe({
        next: () => {},
        error: (error) => console.error("Error Removing Symptoms: ", error)
      });
    }

    if (this.symptomIdsToAdd.length > 0) {

      let medicineSymptoms: MedicineSymptomId[] = this.symptomIdsToAdd.map(symptomId => {
        return new MedicineSymptomId(medicine.Id, symptomId);
      });

      this.medicineSymptomService.addMedicineSymptoms(medicineSymptoms).subscribe({
        next: () => {},
        error: (error) => console.error("Error Adding Symptoms: ", error)
      });
    }
  }

  onDelete(medicine: Medicine) {
    this.medicineService.deleteMedicine(medicine.Id).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (error: any) => console.log("Error Deleting Medicine: ", error)
    });
  }

  /*** Adding and Removing Medicine Symptoms ***/

  onToggleRemoveSymptom(symptomID: Number) {
    if (this.symptomIdsToRemove.includes(symptomID)) {
      this.symptomIdsToRemove = this.symptomIdsToRemove.filter(symptom => symptom !== symptomID);
    } else {
      this.symptomIdsToRemove.push(symptomID);
    }
  }

  onToggleAddSymptom(symptomId: Number) {
    if (this.symptomIdsToAdd.includes(symptomId)) {
      this.symptomIdsToAdd = this.symptomIdsToAdd.filter(symptom => symptom !== symptomId);
    } else {
      this.symptomIdsToAdd.push(symptomId);
    }
  }

  /*** Validation ***/

  validateForm(form: FormGroup): boolean {
    if (form.invalid) {
      this.toastr.error("Please fill out all fields");
      return false;

    } else if (form.value.price < 0 || form.value.price === 0) {
      this.toastr.error("Price cannot be negative or zero");
      return false;
    
    } else if (form.value.stock < 0 || form.value.stock === 0) {
      this.toastr.error("Stock cannot be negative or zero");
      return false;
    
    } else if (form.value.name === "" || form.value.brand === "") {
      this.toastr.error("Name and Brand cannot be empty");
      return false;

    } else {
      return true;
    }
  }

  /*** Navigation ***/

  onGoBack() {
    this.router.navigate(['/dashboard']);
  }

   /*** Theme Section ***/

   toggleTheme(value: string) {
    if (value === 'dark') {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = false;
    }
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateTheme();
  }
  
  updateTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}