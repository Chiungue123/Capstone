import { Injectable } from '@angular/core';
import { OrderService } from './orders.service';
import { OrderItemService } from './order-item.service';
import { MedicineService } from './medicine.service';
import { History } from '../models-dashboard/history';

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