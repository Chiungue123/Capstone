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

// Model Imports
import { User } from '../models/user';
import { OrderData } from '../dashboard-models/order-data';
import { MedicineData } from '../dashboard-models/medicine-data';

// Service Imports
import { ScrollService } from '../services/scroll.service';
import { MedicineDataService } from '../dashboard-services/medicine-data.service';
import { OrderManagementService } from '../dashboard-services/order-data.service';
import { UserService } from '../services/user.service';

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
    CommonModule,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit, OnDestroy {

  private sectionSubscription!: Subscription;
  private userSubscription!: Subscription;

  position: string = "Admin";
  FirstName: string = "Rodger";
  isDarkMode: boolean = false;
  userData: User[] = []; // When receiving raw JSON
  users: User[] = []; // Collects User Objects from JSON
  medicineData: MedicineData[] = [];
  orderData: OrderData[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private scrollService: ScrollService,
    private userService: UserService,
    private medicineDataService: MedicineDataService,
    private orderDataService: OrderManagementService
  ) { 
    //this.loadOrderData();
    //this.loadMedicineData(); 
  }

  ngOnInit(): void {
    this.loadUserData();

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

  loadMedicineData() {
    //this.medicineDataService.generateTestData();
    this.medicineDataService.getMedicineData().subscribe(medicine => {
      this.medicineData = medicine;
      console.log("Medicine Data: ", this.medicineData);
    });
  }

  loadMedicneDetails(medicineId: Number) { 
    console.log("Load Medicine Details")
    this.router.navigate(['/medicine-details', medicineId]);
  }

  loadMedicineForm() {
    console.log("Load Medicine Form")
    this.router.navigate(['/medicine-form']);
  }

  moreMedicines() {
    console.log("More Medicines")
    this.increaseSectionHeight('medicine');
  }

  addNewMedicine() { }

  updateMedicine() { }

  deleteMedicine() { }

  /*** Order Data Section ***/

  loadOrderData() {
    //this.orderDataService.generateTestData();
    this.orderDataService.getOrderData().subscribe(order => {
      this.orderData = order;
      console.log("Order Data: ", this.orderData);
    });
  }

  openOrderDetails(orderId: Number) {
    console.log("Load Order Details")
    this.router.navigate(['/order-details', orderId]);
  }

  loadOrderForm() { 
    console.log("Load Order Form")
    this.router.navigate(['/order-form']);
  }

  moreOrders() {
    console.log("More Orders")
    this.increaseSectionHeight('order');
  }

  addNewOrder() { }

  updateOrder() { }

  deleteOrder() { }

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
    this.sectionSubscription?.unsubscribe();
  }
}