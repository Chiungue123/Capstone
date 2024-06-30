import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { OrderItem, OrderItemId } from '../models/order-item';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class OrderItemService {

  private apiUrl = `${environment.apiUrl}${environment.endpoints.orderItems}`;
  private orderItemsSubject = new BehaviorSubject<OrderItem[]>([]);
  orderItem$: Observable<OrderItem[]> = this.orderItemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  private loadInitialData(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.apiUrl);
  }

  getOrderItems() {
    return this.loadInitialData().pipe(
      tap(orderItems => {
        orderItems = orderItems.map(item => new OrderItem(item['id'], item['order'], item['medicine'], item['quantity'], item['cost']));
        this.orderItemsSubject.next(orderItems);
      }),
      switchMap(() => this.orderItem$)
    );
  }

  getOrderItem(id: OrderItemId) {
    return this.http.get<OrderItem>(`${this.apiUrl}/${id.OrderId}/${id.MedicineId}`);
  }

  getItemsByOrderId(orderId: number) {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/order/${orderId}`).pipe(tap(items => {
      items = items.map(item => new OrderItem(item['id'], item['order'], item['medicine'], item['quantity'], item['cost']));
      const currentOrderItems = this.orderItemsSubject.value;
      this.orderItemsSubject.next([...currentOrderItems, ...items]);
    }));
  }

  addOrderItems(orderItems: OrderItem[]) {
    console.log("Order Items To Add: ", orderItems)
    return this.http.post<OrderItem[]>(`${this.apiUrl}/add`, orderItems).pipe(tap(items => {
      items = items.map(item => new OrderItem(item['id'], item['order'], item['medicine'], item['quantity'], item['cost']));
      const currentOrderItems = this.orderItemsSubject.value.filter(item => !orderItems.includes(item));
      this.orderItemsSubject.next([...currentOrderItems, ...items]);
    }))
  }  

  deleteOrderItems(orderItems: OrderItem[]) {
    console.log("Items To Delete: ", orderItems)
    return this.http.delete<OrderItem[]>(`${this.apiUrl}/delete`, { observe: 'body', body: orderItems }).pipe(tap(() => {
      const currentOrderItems = this.orderItemsSubject.value;
      const filteredItems = currentOrderItems.filter(orderItem => !orderItems.includes(orderItem));
      this.orderItemsSubject.next(filteredItems);
    }));
  }
}
