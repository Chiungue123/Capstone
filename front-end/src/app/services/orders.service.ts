import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Order } from '../models/order';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' }) 

export class OrderService {

  private apiUrl = '${environment.apiUrl}${environment.endpoints.orders}';
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  order$: Observable<Order[]> = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.http.get<Order[]>(this.apiUrl).subscribe(orders => {
      this.ordersSubject.next(orders);
    });
  }

  getOrders() {
    return this.order$;
  }

  getOrder(id: Number) {
    return this.http.get<Order>('${this.apiUrl}/${id}');
  }

  addOrder(order: Order) {
    return this.http.post<Order>('${this.apiUrl}/add', order).pipe(tap(order => {
      const currentOrders = this.ordersSubject.value;
      this.ordersSubject.next([...currentOrders, order])
    }));
  }

  updateOrder(order: Order) {
    return this.http.put<Order>('${this.apiUrl}/update', order).pipe(tap(updated => {
      const currentOrders = this.ordersSubject.value;
      const index = currentOrders.findIndex(order => order.Id === updated.Id);
      currentOrders[index] = updated;
      this.ordersSubject.next([...currentOrders]);
    }));
  }

  deleteOrder(id: Number) {
    return this.http.delete('${this.apiUrl}/delete/${id}').pipe(tap(() => {
      const currentOrders = this.ordersSubject.value.filter(order => order.Id !== id);
      this.ordersSubject.next(currentOrders);
    }));
  }
}