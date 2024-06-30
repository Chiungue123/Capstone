import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderManagementService } from '../../dashboard-services/order-data.service';
import { User } from '../../models/user';
import { OrderItem, OrderItemId } from '../../models/order-item';
import { Order } from '../../models/order';
import { OrderData } from '../../dashboard-models/order-data';
import { isEditState, isAddState, isViewState } from '../../dashboard-models/navigation-state';
import { Medicine } from '../../models/medicine';
import { OrderService } from '../../services/orders.service';
import { OrderItemService } from '../../services/order-item.service';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  orderSub!: Subscription;
  itemSub!: Subscription;
  userSub!: Subscription;

  orderForm!: FormGroup;                // Form Controls
  order: Order = new Order();           // For displaying order details
  
  allUsers: User[] = [];                // Add Mode: Display User Names
  userToAdd!: User;                     // Add Mode => User to Add to Order
  user: User = new User();              // View Mode: Display User ID

  medicines: Medicine[] = [];           // Edit Mode: For displaying current medicines
  medicinesToAdd: Medicine[] = [];      // Edit Mode: For adding new medicines
  medicinesToRemove: Medicine[] = [];   // Edit Mode: For removing medicines

  items: OrderItem[] = [];              // View & Edit Mode => Display Existing Order Items
  itemsToAdd: OrderItem[] = [];         // Add & Edit Mode => New Order Items
  itemsToRemove: OrderItem[] = [];      // Edit Mode: Order Items to Remove

  isDropdownOpen: boolean = false;      // For dropdown when adding/updating order
  showItems: boolean = false;           // Toggle Order Items
  isEditMode: boolean = false;          // Edit Mode
  isAddMode: boolean = false;           // Add Mode
  isDarkMode: boolean = false;          // Dark Modes

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private orderDataService: OrderManagementService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private medicineService: MedicineService,
    private fb: FormBuilder
  ) {
    this.orderForm = new FormGroup({});
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation?.extras.state as any;

      if (isViewState(state)) {
        //console.log("View Mode: ", state);
        this.order = this.convertToOrder(state.order);
        this.items = this.convertToItems(state.items);
        this.user = this.convertToUser(state.user);
        this.updateForm(this.order);

      } else if (isAddState(state)) {
        //console.log("Add Mode: ", state);
        this.allUsers = state.users.map(user => new User(user['id'], user['firstName'], user['lastName'], user['username'], user['password'], user['email'], user['address'], user['phone'], user['isAdmin'], user['createdOn'], user['modifiedOn']));
        this.medicinesToAdd = state.medicines.map(medicine => new Medicine(medicine['id'], medicine['name'], medicine['price'], medicine['brand'], medicine['stock']));
        this.isAddMode = true;
        this.initializeAddForm();
      
      } else {
        console.log("Invalid Navigation State: ", state);
      }
    }
  }

  ngOnInit() {
    if (localStorage.getItem('darkMode') === 'true') {
      this.isDarkMode = true;
    }
  }

/*** Data Conversion ***/

  convertToOrder(order: any): Order {
    if (order instanceof Order) {
        return order;
    } else {
        let newOrder =  new Order(order['id'], order['shipFrom'], order['shipTo'], order['cost'], order['createdOn'], order['modifiedOn'], order['status'], order['userId']);
        return newOrder;
    }
  }

  convertToItems(items: any[]): OrderItem[] {
    return items.map(item => new OrderItem(
      new OrderItemId(item['id']['orderId'], item['id']['medicineId']), this.order, 
      new Medicine(item['medicine']['id'], item['medicine']['name'], item['medicine']['price'], item['medicine']['brand'], item['medicine']['stock']), item['quantity'], item['cost'])
    );
  }

  convertToUser(user: any): User {
    if (user instanceof User) {
      return user;
    } else {
      return new User(user['id'], user['firstName'], user['lastName'], user['username'], user['password'], user['email'], user['address'], user['phone'], user['isAdmin'], user['createdOn'], user['modifiedOn']);
    }
  };

  convertToMedicine(items: any[]): Medicine[] {
    return items.map(item => new Medicine(item['medicine']['id'], item['medicine']['name'], item['medicine']['price'], item['medicine']['brand'], item['medicine']['stock']));
  }

/*** Order Items ***/

  onAddMedicineToOrder(id: Number, quantity: any) {

    // Using ID and Quantity, find medicine from medicinesToAdd
    const medicine = this.medicinesToAdd.find(medicine => medicine.Id === id);

    if (medicine) {

      // Check if item already exists, update quantity & cost // If not, push to itemsToAdd
      const existingOrderItem = this.itemsToAdd.find(orderItem => orderItem.Medicine.Id === medicine.Id);
      if (existingOrderItem) { 
        
        existingOrderItem.Quantity = quantity.toString();
        existingOrderItem.Cost = existingOrderItem.Medicine.Price * existingOrderItem.Quantity;
      } else { 
        
        const orderItem = new OrderItem(new OrderItemId(0, medicine.Id), new Order(), medicine, quantity, medicine.Price * quantity);
        this.itemsToAdd.push(orderItem);
      }
    }
  }

  onRemoveMedicineFromOrder(id: Number) {
    const item = this.items.find(item => item.Medicine.Id === id);

    if (item && !this.itemsToRemove.includes(item)) {
      this.itemsToRemove.push(item);
    } 
  }

  onAddUser(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedUserId = +target.value;
    const selectedUser = this.allUsers.find(user => user.Id === selectedUserId);
    if (selectedUser) {
      this.orderForm.get('userId')?.setValue(selectedUser.Id);
      this.userToAdd = selectedUser;
      //console.log("From onAddUser() => User To Add: ", this.userToAdd)
    }
  }

/*** Form Initialization ***/

  initializeAddForm(): FormGroup {
    return this.orderForm = this.fb.group({
      shipFrom: ['', Validators.required],
      shipTo: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }
 
  initializeForm(): FormGroup {
    return this.orderForm = this.fb.group({
      shipFrom: ['', Validators.required],
      shipTo: ['', Validators.required],
      cost: ['', Validators.required],
      createdOn: ['', Validators.required],
      modifiedOn: ['', Validators.required],
      userId: ['', Validators.required],
      status: ['', Validators.required] 
    });
  }

  onEdit() {
    this.isEditMode = true;
    this.updateForm(this.order);
  }

  updateForm(order: Order): FormGroup {

    this.initializeForm();
    this.getMedicinesToAdd();

    this.orderForm.patchValue({
      shipFrom: order.ShipFrom,
      shipTo: order.ShipTo,
      cost: order.Cost,
      createdOn: order.CreatedOn,
      modifiedOn: order.ModifiedOn,
      userId: order.UserId,
      status: order.Status
    });

    return this.orderForm;
  }

  getMedicinesToAdd(): Medicine[] {
    this.medicineService.getMedicines().subscribe({
      next: (medicines: Medicine[]) => {
        this.medicinesToAdd = medicines.map(medicine => new Medicine(medicine['id'], medicine['name'], medicine['price'], medicine['brand'], medicine['stock'])); // Convert to Medicine
        this.medicinesToAdd = this.medicinesToAdd.filter(medicine => !this.items.map(item => item.Medicine.Id).includes(medicine.Id)); // Filter out existing medicines      
      },
      error: (error) => console.error("Error loading medicines: ", error)
    });

    return this.medicinesToAdd;
  }

/*** Form Submission ***/

  onAdd() {

    /** Validate Form **/

    if (this.orderForm.invalid) {
      this.toastr.error("Please fill in all required fields", "Error");
      return;
    } else if (this.itemsToAdd.length === 0) {
      this.toastr.error("Please add items to the order", "Error");
      return;
    } else if (this.userToAdd === undefined || this.userToAdd === null) {
      this.toastr.error("Please select a user for the order", "Error");
      return;
    }

    /** Convert to Order Data & Submit **/
    let newOrder: Order = new Order();
    newOrder.ShipFrom = this.orderForm.get('shipFrom')?.value;
    newOrder.ShipTo = this.orderForm.get('shipTo')?.value;
    newOrder.CreatedOn = new Date();
    newOrder.ModifiedOn = new Date();
    newOrder.Status = "Pending";
    newOrder.UserId = this.orderForm.get('userId')?.value;
    newOrder.Cost = this.calculateOrderTotal(this.itemsToAdd);
    
    this.orderService.addOrder(newOrder).subscribe({
      next: (order: Order) => {
        newOrder = order;
    
        const newOrderItems: OrderItem[] = this.itemsToAdd.map(item => {
          let itemCost = item.Medicine.Price * item.Quantity;
          return new OrderItem(
            new OrderItemId(order['id'], item.Medicine.Id),
            newOrder,
            item.Medicine,
            item.Quantity,
            itemCost
          );
        });

        console.log("New Order Items: ", newOrderItems);
    
        this.orderItemService.addOrderItems(newOrderItems).subscribe({
          next: (items: OrderItem[]) => {
            items = items.map(item => new OrderItem(item['id'], item['order'], item['medicine'], item['quantity'], item['cost']));
            console.log("Updated Items: ", items)
            this.toastr.success("Order added successfully", "Success");
            this.router.navigate(['/dashboard']);
          },
          error: (error) => console.error("Error adding items: ", error)
        });
      },
      error: (error) => console.error("Error adding order: ", error)
    });
  }

  onUpdate() {

    /** Log Order Form & Original Data **/

    console.log("======= Order Details Update Order =======")
    console.log("Existing Items: ", this.items)
    console.log("Items To Add: ", this.itemsToAdd)
    console.log("Items To Remove: ", this.itemsToRemove)
    console.log("Submitted Order Form: ", this.orderForm.value)
    console.log("============================================")

    /** Validate Form **/

    if (this.orderForm.invalid || this.items.length === 0) {
      this.toastr.error("Please fill in all required fields", "Error");
      console.log("Form Invalid", this.orderForm.invalid)
      return;
    } else if (isNaN(this.orderForm.get('userId')?.value) || this.orderForm.get('userId') === null) {
      this.toastr.error("No User Id for Order Found", "Error");
      return;
    }

    /** Convert to Order Data & Submit Form **/
    
    const updatedOrder: Order = new Order(
      this.order.Id,
      this.orderForm.get('shipFrom')?.value,
      this.orderForm.get('shipTo')?.value,
      0,
      this.orderForm.get('createdOn')?.value,
      new Date(),
      this.orderForm.get('status')?.value,
      this.orderForm.get('userId')?.value
    );

    if (this.itemsToAdd.length > 0) {
      this.itemsToAdd = this.itemsToAdd.map(item => new OrderItem(new OrderItemId(updatedOrder.Id, item.Medicine.Id), updatedOrder, item.Medicine, item.Quantity, item.Cost));
      this.items = this.items.concat(this.itemsToAdd);
    }

    if (this.itemsToRemove.length > 0) {
      this.itemsToRemove = this.itemsToRemove.map(item => new OrderItem(new OrderItemId(updatedOrder.Id, item.Medicine.Id), updatedOrder, item.Medicine, item.Quantity, item.Cost));
      this.items = this.items.filter(item => !this.itemsToRemove.includes(item));
    }
     
    updatedOrder.Cost = this.calculateOrderTotal(this.items);
    console.log("Sending Updated Order: ", updatedOrder)

    this.orderService.updateOrder(updatedOrder).subscribe({
      next: () => {
       this.orderItemService.addOrderItems(this.itemsToAdd).subscribe({
          next: () => {
            this.orderItemService.deleteOrderItems(this.itemsToRemove).subscribe({
              next: () => {
                this.toastr.success("Order updated successfully", "Success");
                this.router.navigate(['/dashboard']);
              },
              error: (error) => console.error("Error deleting items: ", error)
            });
          },
          error: (error) => console.error("Error updating items: ", error)
        });
      },
      error: (error) => console.error("Error updating order: ", error)
    });
  }

  onDelete(orderID: number) {
    console.log("Delete Order: ", orderID)
    this.orderService.deleteOrder(orderID).subscribe({
      next: () => {
        this.toastr.success("Order deleted successfully", "Success")
        this.router.navigate(['/dashboard']);
      },
      error: (error) => console.error("Error deleting order: ", error)
    });
  }

  calculateOrderTotal(itemsToAdd: OrderItem[]): number {
    
    let total = 0;
    itemsToAdd.forEach(item => {
      total += item.Cost;
    });

    return total;
  }

  onGoBack() {
    this.router.navigate(['/dashboard']);
  }

/*** Theme Section ***/

  onToggleItems() {
    this.showItems = !this.showItems;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

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
}