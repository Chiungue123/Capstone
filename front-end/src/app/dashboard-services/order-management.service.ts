import { Injectable } from '@angular/core';
import { OrderService } from '../services/orders.service';
import { OrderItemService } from '../services/order-item.service';
import { MedicineService } from '../services/medicine.service';
import { History } from '../dashboard-models/history';

@Injectable({ providedIn: 'root' })

export class OrderManagementService {

  constructor(
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private medicineService: MedicineService) { }

  getHistory() {}

  getHistoryById() {}

  addHistory() {}

  updateHistory() {}

  removeHistory() {}
  
}