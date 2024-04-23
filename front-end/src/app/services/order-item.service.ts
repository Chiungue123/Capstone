import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OrderItem, OrderItemId } from '../models/order-item';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class OrderItemService {

  private apiUrl = '${environment.apiUrl}${environment.endpoints.orderItems}'
  private orderItemsSubject = new BehaviorSubject<OrderItem[]>([]);
  orderItem$: Observable<OrderItem[]> = this.orderItemsSubject.asObservable();

  constructor(private http:HttpClient) {
    this.loadInitialData();
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
          item.Id.OrderId === updated.Id.OrderId && item.Id.MedicineId === updated.Id.MedicineId);
      currentOrderItems[index] = updated;
      this.orderItemsSubject.next([...currentOrderItems]);
    }));
  }

  deleteOrderItem(id: OrderItemId) {
    return this.http.delete<OrderItem>('${this.apiUrl}/delete/${id.orderId}/${id.medicineId}').pipe(tap(() => {
      const currentOrderItems = this.orderItemsSubject.value.filter(orderItem => 
        orderItem.Id.MedicineId !== id.MedicineId && 
        orderItem.Id.OrderId !== id.OrderId);
      this.orderItemsSubject.next(currentOrderItems);
    }));
  }
}
