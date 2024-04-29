import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { MedicineData } from '../../dashboard-models/medicine-data';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-medicine-card',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    RouterModule
  ],
  templateUrl: './medicine-card.component.html',
  styleUrl: './medicine-card.component.css',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class MedicineCardComponent {

  @Input() medicine!: MedicineData;
 
  constructor(private router: Router) { }

  ngOnInit() { }

  ngOnDestroy() { }
}