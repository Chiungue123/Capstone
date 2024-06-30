import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, map, take } from 'rxjs';

// Component Imports
import { HeaderComponent } from '../footer/header/header.component';
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
import { OrderItemService } from '../services/order-item.service';
import { OrderItem } from '../models/order-item';
import { AuthService } from '../services/auth.service';
import { Pipe } from '@angular/core';

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
  loggedInUser!: User; // Represents the Logged In User
  userData: User[] = []; // When receiving raw JSON
  users: User[] = []; // Collects User Objects from JSON
  symptoms: Symptom[] = [];
  medicines: Medicine[] = [];
  orderData: OrderData[] = [];
  orders: Order[] = [];
  orderItems: OrderItem[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private scrollService: ScrollService,
    private userService: UserService,
    private medicineService: MedicineService,
    private orderItemService: OrderItemService,
    private orderService: OrderService,
    private symptomService: SymptomService,
    private authService: AuthService
  ) { 
    /*const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {

      const state = navigation.extras.state as { loggedInUser: User }
      this.loggedInUser = state.loggedInUser;

      if (this.loggedInUser.FirstName === '' || this.loggedInUser.LastName === '') {
        console.log("Dashboard: Logged User: ", this.loggedInUser.FirstName + " " + this.loggedInUser.LastName)

      } else if (!this.loggedInUser === undefined || !this.loggedInUser === null) {
        this.toastr.info("Dashboard: No Logged User")
        router.navigate(['/login']);
      }
    }*/
  }

  ngOnInit(): void {
    /*if (this.loggedInUser === undefined || this.loggedInUser === null) {
      this.toastr.info("Dashboard: No Logged User")
      this.router.navigate(['/login']);
    
    } else if (this.loggedInUser['firstName'] !== '' || this.loggedInUser['lastName'] !== '') { 
      this.loggedInUser = new User(this.loggedInUser['id'], this.loggedInUser['firstName'], this.loggedInUser['lastName'], this.loggedInUser['username'], '', this.loggedInUser['email'], this.loggedInUser['address'], this.loggedInUser['phone'], this.loggedInUser['isAdmin'], this.loggedInUser['createdOn'], this.loggedInUser['modifiedOn'])
    
    } else if (this.loggedInUser.FirstName == '' && this.loggedInUser.LastName == '') {
      this.toastr.info("Dashboard: No Logged User")
      this.router.navigate(['/login']);
    }*/

    this.loadUserData();
    this.loadMedicines();
    this.loadSymptoms();
    this.loadOrders();
    this.loadOrderItems();

    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateTheme();

    this.sectionSubscription = this.scrollService.currentSection.subscribe(section => {
      this.scrollToSection(section);
    });
  }

  /*** User Data Section ***/

  loadUserData() {
    this.userSubscription = this.userService.getUsers().pipe().subscribe({
      next: (userData: User[]) => this.users = userData.map(user => new User(user['id'], user['firstName'], user['lastName'], 
        user['username'], '', user['email'], user['address'], user['phone'], user['isAdmin'], user['createdOn'], user['modifiedOn'])),
      error: (error) => console.error("Error loading users: ", error)
    })
  }

  loadUserForm() { 
    this.router.navigate(['/user-details'], {state: {mode: "add"/*, loggedInUser: this.loggedInUser*/}});
  }

  moreUsers() {
    console.log("More Users")
    this.increaseSectionHeight('user');
  }

  /*** Medicine Data Section ***/

  loadMedicines() {
    this.medicineSubscription = this.medicineService.getMedicines().subscribe({
      next: (medicines: Medicine[]) => this.medicines = medicines.map(medicine => new Medicine(medicine['id'], medicine['name'], medicine['price'], medicine['brand'], medicine['stock'])),
      error: (error) => console.error("Error loading medicines: ", error)
    });
  }

  loadMedicineForm() {
    console.log("Load Medicine Form")
    this.router.navigate(['/medicine-details'], {state: {mode: "add"/*, loggedInUser: this.loggedInUser*/}});
  }

  moreMedicines() {
    console.log("More Medicines")
    this.increaseSectionHeight('medicine');
  }

  /*** Order Data Section ***/

  loadOrders() {
    this.orderSubscription = this.orderService.getOrders().pipe().subscribe({
      next: (orders: Order[]) => this.orders = orders.map(order => new Order(order['id'], order['shipFrom'], order['shipTo'], order['cost'], order['createdOn'], order['ModifiedOn'], order['status'], order['userId'])),
      error: (error) => console.error("Error loading orders: ", error)
    });
  }

  loadOrderItems() {
    this.orderItemService.getOrderItems().pipe().subscribe({
      next: (orderItems: OrderItem[]) => this.orderItems = orderItems.map(orderItem => new OrderItem(orderItem['id'], orderItem['order'], orderItem['medicine'], orderItem['quantity'], orderItem['cost'])),
      error: (error) => console.error("Error loading order items: ", error)
    });
  }

  loadOrderForm() { 
    this.router.navigate(['/order-details'], {state: {mode: "add", medicines: this.medicines, users: this.users/*, loggedInUser: this.loggedInUser*/}});
  }

  moreOrders() {
    console.log("More Orders")
    this.increaseSectionHeight('order');
  }

  /*** Symptom Data Section ***/

  loadSymptoms() {
    this.symptomService.getSymptoms().pipe().subscribe({
      next: (symptomData: Symptom[]) => this.symptoms = symptomData.map(symptom => new Symptom(symptom['id'], symptom['description'])),
      error: (error) => console.error("Error loading symptoms: ", error)
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