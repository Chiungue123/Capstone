import { TestBed } from '@angular/core/testing';

import { MedicineDataService } from '../services-dashboard/medicine-data.service';

describe('OrderManagementService', () => {
  let service: MedicineDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
