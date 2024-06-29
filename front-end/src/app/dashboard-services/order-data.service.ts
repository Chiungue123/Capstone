import { Injectable } from '@angular/core';
import { OrderService } from '../services/orders.service';
import { OrderItemService } from '../services/order-item.service';
import { MedicineService } from '../services/medicine.service';
import { OrderData } from '../dashboard-models/order-data';
import { Order } from '../models/order';
import { OrderItem, OrderItemId } from '../models/order-item';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { MedicineSymptomService } from '../services/medicine-symptom.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })

export class OrderManagementService {

  //private orderData: OrderData[] = [];
  private orderDataSubject = new BehaviorSubject<OrderData[]>([]);
  public orderData$: Observable<OrderData[]> = this.orderDataSubject.asObservable();

  constructor(
    private toastr: ToastrService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private medicineService: MedicineService,
    private medicineSymptomService: MedicineSymptomService) { }

  getOrderData() {
    return this.orderData$;
  }

  getOrderDataById(orderId: Number) {
    return this.orderData$.pipe(map(orderData => orderData.find(data => data.order.Id === orderId)));
  }

  orderDetailsForId(id: number): Order {
    let order: Order = new Order();
    this.orderService.getOrder(id).subscribe({
      next: (order: Order) => order = new Order(order['id'], order['ShipFrom'], order['ShipTo'], order['cost'], order['createdOn'], order['modifiedOn'], order['status'], order['userId']),
      error: (error) => console.error("Error loading order: ", error)
    });

    return order
  }

  addOrderData(newOrderData: OrderData) {

    console.log("Order Data To Add: ", newOrderData);

    this.orderService.addOrderData(newOrderData).subscribe({
      next: (order: OrderData) => console.log("New Order Data added: ", order),
      error: (error) => console.error("Error adding order: ", error)
    });
  }

  updateOrderData(updatedOrderData: OrderData) {

    console.log("Order Data To Update: ", updatedOrderData);

    this.orderService.updateOrderData(updatedOrderData).subscribe({
      next: (order: OrderData) => console.log("OrderData updated: ", order),
      error: (error) => console.error("Error updating order: ", error)
    });

    /*his.orderItemService.updateOrderItems(updatedOrderData.Order.Id, updatedOrderData.Inventory, []).subscribe({
      next: (items: OrderItem[]) => console.log("Items updated: ", items),
      error: (error) => console.error("Error updating items: ", error)
    });*/
  }

  removeOrderData() {}
}