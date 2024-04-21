import { TestBed } from '@angular/core/testing';

import { MedicineSymptomService } from './medicine-symptom.service';

describe('MedicineSymptomService', () => {
  let service: MedicineSymptomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineSymptomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
