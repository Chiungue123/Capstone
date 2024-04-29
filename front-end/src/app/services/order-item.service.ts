import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OrderItem, OrderItemId } from '../models/order-item';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class OrderItemService {

  private apiUrl = environment.apiUrl + environment.endpoints.orderItems;
  private orderItemsSubject = new BehaviorSubject<OrderItem[]>([]);
  orderItem$: Observable<OrderItem[]> = this.orderItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    //this.loadInitialData();
  }

  private loadInitialData() {
    this.http.get<OrderItem[]>(this.apiUrl).subscribe(orderItems => {
      this.orderItemsSubject.next(orderItems);
    })
  }

  getOrderItems() {
    return this.orderItem$;
  }

  getOrderItem(id: OrderItemId) {
    return this.http.get<OrderItem>('${this.apiUrl}/${id.orderId}/${id.medicineId');
  }

  addOrderItem(orderItem: OrderItem) {
    return this.http.post<OrderItem>('${this.apiUrl}/add', orderItem).pipe(tap(orderItem => {
      const currentOrderItems = this.orderItemsSubject.value;
      this.orderItemsSubject.next([...currentOrderItems, orderItem]);
    }))
  }

  updateOrderItem(orderItem: OrderItem) {
    return this.http.put<OrderItem>('${this.apiUrl}/update', orderItem).pipe(
      tap(updated => {
        const currentOrderItems = this.orderItemsSubject.value;
        const index = currentOrderItems.findIndex(item => 
          item.Id.orderId === updated.Id.orderId && item.Id.medicineId === updated.Id.medicineId);
      currentOrderItems[index] = updated;
      this.orderItemsSubject.next([...currentOrderItems]);
    }));
  }

  deleteOrderItem(id: OrderItemId) {
    return this.http.delete<OrderItem>('${this.apiUrl}/delete/${id.orderId}/${id.medicineId}').pipe(tap(() => {
      const currentOrderItems = this.orderItemsSubject.value.filter(orderItem => 
        orderItem.Id.medicineId !== id.medicineId && 
        orderItem.Id.orderId !== id.orderId);
      this.orderItemsSubject.next(currentOrderItems);
    }));
  }
}
