import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

// Component Imports
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserComponent } from '../user-details/user.component';
import { UserCardComponent } from '../dashboard-cards/user-card/user-card.component';
import { OrderComponent } from '../order-details/order.component';
import { OrderCardComponent } from '../dashboard-cards/order-card/order-card.component';
import { MedicineComponent } from '../medicine-details/medicine.component';
import { MedicineCardComponent } from '../dashboard-cards/medicine-card/medicine-card.component';

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

  user!: User;
  position: string = "Admin";
  FirstName: string = "Rodger";
  isDarkMode: boolean = false;
  userData: User[] = [];
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
    this.loadUserData();
    this.loadOrderData();
    this.loadMedicineData(); 
  }

  ngOnInit() {
      this.isDarkMode = localStorage.getItem('darkMode') === 'true';
      this.updateTheme();

      this.sectionSubscription = this.scrollService.currentSection.subscribe(section => {
      this.scrollToSection(section);
    });
  }

  /*** User Data Section ***/

  loadUserData() {
    this.userService.generateTestData();
    this.userService.getUsers().subscribe(users => {
      this.userData = users;
      console.log("User Data: ", this.userData);
    })
  }

  /*** Medicine Data Section ***/

  loadMedicineData() {
    this.medicineDataService.generateTestData();
    this.medicineDataService.getMedicineData().subscribe(medicine => {
      this.medicineData = medicine;
      console.log("Medicine Data: ", this.medicineData);
    });
  }

  /*** Order Data Section ***/

  loadOrderData() {
    this.orderDataService.generateTestData();
    this.orderDataService.getOrderData().subscribe(order => {
      this.orderData = order;
      console.log("Order Data: ", this.orderData);
    });
  }


  /*** Scroll Section ***/

  scrollToSection(sectionId: string) {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
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
    this.sectionSubscription.unsubscribe();
  }
}

/*
  const navigation = this.router.getCurrentNavigation();

  if (navigation && navigation.extras && navigation.extras.state) {
    
    const state = navigation.extras.state as { user: User }
    this.user = state.user;
    console.log("Dashboard Page");
    console.log("User: ", this.user);

    this.validateUser(this.user);
  }
  */