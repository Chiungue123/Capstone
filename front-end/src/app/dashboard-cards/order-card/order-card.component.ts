import { CommonModule, NgForOf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrderData } from '../../dashboard-models/order-data';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    RouterModule
  ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})

export class OrderCardComponent {

  @Input() order!: OrderData;

  constructor(private router: Router) { }

  ngOnInit() { }

  ngOnDestroy() { }

}
