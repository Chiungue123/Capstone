import { TestBed } from '@angular/core/testing';
import { OrderManagementService } from './order-data.service';

describe('OrderManagementService', () => {
  let service: OrderManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
