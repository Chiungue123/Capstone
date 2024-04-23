import { Injectable } from '@angular/core';
import { OrderService } from '../services/orders.service';
import { OrderItemService } from '../services/order-item.service';
import { MedicineService } from '../services/medicine.service';
import { MedicineData } from '../models-dashboard/medicine-data';

@Injectable({ providedIn: 'root' })

export class OrderManagementService {

  constructor(private orderService: OrderService,
              private orderItemService: OrderItemService,
              private medicineService: MedicineService) { }
  

  getMedicineData() {}

  getMedicineDataById() {}

  addMedicineData() {}

  updateMedicineData() {}

  removeMedicineData() {}

}
