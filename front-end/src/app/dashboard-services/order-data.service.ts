import { Injectable } from '@angular/core';
import { OrderService } from '../services/orders.service';
import { OrderItemService } from '../services/order-item.service';
import { MedicineService } from '../services/medicine.service';
import { OrderData } from '../dashboard-models/order-data';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class OrderManagementService {

  //private orderData: OrderData[] = [];

  private orderDataSubject = new BehaviorSubject<OrderData[]>([]);
  public orderData$: Observable<OrderData[]> = this.orderDataSubject.asObservable();

  constructor(
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private medicineService: MedicineService) { }

  getOrderData() {
    return this.orderData$;
  }

  getOrderDataById(orderId: Number) {
    return this.orderData$.pipe(map(orderData => orderData.find(data => data.order.Id === orderId)));
  }

  addOrderData() {}

  updateOrderData() {}

  removeOrderData() {}

  generateTestData() {
    const orderData: OrderData[] = [
      new OrderData(new Order(1, "from", "to", 50, new Date(), new Date(), 1),
      [new OrderItem(), new OrderItem(), new OrderItem()] ),

      new OrderData(new Order(2, "from", "to", 50, new Date(), new Date(), 1),
      [new OrderItem(), new OrderItem(), new OrderItem()] ),

      new OrderData(new Order(3, "from", "to", 50, new Date(), new Date(), 1),
      [new OrderItem(), new OrderItem(), new OrderItem()] )
    ]
    this.orderDataSubject.next(orderData);
  }
}