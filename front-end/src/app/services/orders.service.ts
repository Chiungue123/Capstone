import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Order } from '../models/order';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OrderItem } from '../models/order-item';
import { OrderData } from '../dashboard-models/order-data';

@Injectable({ providedIn: 'root' }) 

export class OrderService {

  private apiUrl = `${environment.apiUrl}${environment.endpoints.orders}`;
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  order$: Observable<Order[]> = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) { }

  private loadOrderData(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrders() {
    return this.loadOrderData().pipe(
      tap(orders => {
        this.ordersSubject.next(orders);
      }),
      switchMap(() => this.order$)
    )
  }

  getOrder(id: Number) {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  addOrder(order: Order) {
    return this.http.post<Order>(`${this.apiUrl}/add`, order).pipe(tap(order => {
      const currentOrders = this.ordersSubject.value;
      this.ordersSubject.next([...currentOrders, order])
    }));
  }

  addOrderData(orderData: OrderData) {
    return this.http.post<OrderData>(`${this.apiUrl}/add`, orderData).pipe(tap(data => {
      const currentOrders = this.ordersSubject.value;
      this.ordersSubject.next([...currentOrders, data.order]);
    }));
  }

  updateOrder(order: Order) {
    return this.http.put<Order>(`${this.apiUrl}/update`, order).pipe(tap(updated => {
      const currentOrders = this.ordersSubject.value;
      const index = currentOrders.findIndex(order => order.Id === updated.Id);
      currentOrders[index] = updated;
      this.ordersSubject.next([...currentOrders]);
    }));
  }

  updateOrderData(orderData: OrderData) {
    return this.http.put<OrderData>(`${this.apiUrl}/update`, orderData).pipe(tap(updated => {
      const currentOrders = this.ordersSubject.value;
      const index = currentOrders.findIndex(order => order.Id === updated.order.Id);
      currentOrders[index] = updated.order;
      this.ordersSubject.next([...currentOrders]);
    }));
  }

  deleteOrder(id: Number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(tap(() => {
      const currentOrders = this.ordersSubject.value.filter(order => order.Id !== id);
      this.ordersSubject.next(currentOrders);
    }));
  }
}