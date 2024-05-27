import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';

// Component Imports
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserComponent } from '../dashboard-components/user-details/user.component';
import { UserCardComponent } from '../dashboard-components/user-card/user-card.component';
import { OrderComponent } from '../dashboard-components/order-details/order.component';
import { OrderCardComponent } from '../dashboard-components/order-card/order-card.component';
import { MedicineComponent } from '../dashboard-components/medicine-details/medicine.component';
import { MedicineCardComponent } from '../dashboard-components/medicine-card/medicine-card.component';
import { SymptomCardComponent } from '../dashboard-components/symptom-card/symptom-card.component';

// Model Imports
import { User } from '../models/user';
import { OrderData } from '../dashboard-models/order-data';
import { Order } from '../models/order';
import { Medicine } from '../models/medicine';

// Service Imports
import { ScrollService } from '../services/scroll.service';
import { OrderManagementService } from '../dashboard-services/order-data.service';
import { UserService } from '../services/user.service';
import { MedicineService } from '../services/medicine.service';
import { OrderService } from '../services/orders.service';
import { SymptomService } from '../services/symptom.service';
import { Symptom } from '../models/symptom';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    UserComponent,
    UserCardComponent,
    OrderComponent,
    OrderCardComponent,
    MedicineComponent,
    MedicineCardComponent,
    SymptomCardComponent,
    CommonModule,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit, OnDestroy {

  private sectionSubscription!: Subscription;
  private medicineSubscription!: Subscription;
  private orderSubscription!: Subscription;
  private userSubscription!: Subscription;

  position: string = "Admin";
  FirstName: string = "Rodger";
  isDarkMode: boolean = false;
  userData: User[] = []; // When receiving raw JSON
  users: User[] = []; // Collects User Objects from JSON
  symptoms: Symptom[] = [];
  medicines: Medicine[] = [];
  orderData: OrderData[] = [];
  orders: Order[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private scrollService: ScrollService,
    private userService: UserService,
    private medicineService: MedicineService,
    private orderDataService: OrderManagementService,
    private orderService: OrderService,
    private symptomService: SymptomService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadMedicines();
    this.loadSymptoms();
    //this.loadOrderData();

    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateTheme();

    this.sectionSubscription = this.scrollService.currentSection.subscribe(section => {
      this.scrollToSection(section);
    });
  }

  /*** User Data Section ***/

  loadUserData() {
    this.userSubscription = this.userService.getUsers().pipe().subscribe({
      next: (userData: User[]) => {
        this.users = userData.map(user => 
          new User(user['id'], user['firstName'], user['lastName'], user['username'], '', user['email'],
           user['address'], user['phone'], user['isAdmin'], user['createdOn'], user['modifiedOn'])
        );
        console.log("Users: ", this.users.length > 0 ? this.users : "None")
      },
      error: (error) => {
        console.error("Error loading users: ", error);
      }
    })
  }

  loadUserDetails(user: User) { 
    console.log("Load User Details")
    this.router.navigate(['/user-details'], {state: {mode: "view", user: user}});
  }

  loadUserForm() { 
    console.log("Load User Form")
    this.router.navigate(['/user-details'], {state: {mode: "add"}});
  }

  moreUsers() {
    console.log("More Users")
    this.increaseSectionHeight('user');
  }

  /*** Medicine Data Section ***/

  loadMedicines() {
    this.medicineSubscription = this.medicineService.getMedicines().subscribe({
      next: (medicines: Medicine[]) => {
        this.medicines = medicines.map(medicine =>
          new Medicine(medicine['id'], medicine['name'], medicine['price'], medicine['brand'], medicine['stock'])
        );
        console.log("Medicines: ", this.medicines.length > 0 ? this.medicines : "None")
      },
      error: (error) => console.error("Error loading medicines: ", error)
    });
  }

  loadMedicneDetails(medicine: Medicine) { 
    console.log("Load Medicine Details")
    this.router.navigate(['/medicine-details', medicine]);
  }

  loadMedicineForm() {
    console.log("Load Medicine Form")
    this.router.navigate(['/medicine-details'], {state: {mode: "add"}});
  }

  moreMedicines() {
    console.log("More Medicines")
    this.increaseSectionHeight('medicine');
  }

  /*** Order Data Section ***/

  loadOrderData() {
    this.orderSubscription = this.orderDataService.getOrderData().pipe().subscribe({
      next: (orders: OrderData[]) => {
        this.orderData = orders.map(order =>
          new OrderData(order['order'], order['Inventory'])
        );
        console.log("Orders: ", this.orders.length > 0 ? this.orders : "None")
      },
      error: (error) => {
        console.error("Error loading orders: ", error);
      }
    });
  }

  openOrderDetails(orderId: Number) {
    console.log("Load Order Details")
    this.router.navigate(['/order-details', orderId]);
  }

  loadOrderForm() { 
    console.log("Load Order Form")
    this.router.navigate(['/order-details']);
  }

  moreOrders() {
    console.log("More Orders")
    this.increaseSectionHeight('order');
  }

  /*** Symptom Data Section ***/

  loadSymptoms() {
    this.symptomService.getSymptoms().pipe().subscribe({
      next: (symptomData: Symptom[]) => {
        this.symptoms = symptomData.map(symptom =>
          new Symptom(symptom['id'], symptom['description'])
        );
        console.log("Symptoms: ", this.symptoms.length > 0 ? this.symptoms : "None")
      },
      error: (error) => {
        console.error("Error loading symptoms: ", error);
      }
    });
  }

  loadSymptomDetails() {
    console.log("Load Symptom Details")
  }

  loadSymptomForm() {
    console.log("Load Symptom Form")
  }

  moreSymptoms() {
    console.log("More Symptoms")
  }

  /*** Scroll Section ***/

  scrollToSection(sectionId: string) {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  increaseSectionHeight(section: string) {
    let newHeight = `calc(var(--${section}-section-height) + 200px)`;
    document.documentElement.style.setProperty(`--${section}-section-height`, newHeight)
  }

  /*** Validation Section ***/

  validateUser(user: User) {
    console.log("User: ", user)

    if (user.Email === '' || user.Email === null ||
      user.Email === undefined || !user.Email.includes("@")) {

      this.toastr.error("Incorrectly Formatted Email: Redirecting to Login")
      this.router.navigate(['/login'])
    } else {
       console.log("Registration Page: Email Verified")
    }
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
    this.userSubscription?.unsubscribe();
    this.medicineSubscription?.unsubscribe();
    this.orderSubscription?.unsubscribe();
    this.sectionSubscription?.unsubscribe();
  }
}