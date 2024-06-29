import { CommonModule, NgForOf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrderManagementService } from '../../dashboard-services/order-data.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/orders.service';
import { OrderItemService } from '../../services/order-item.service';
import { OrderItem, OrderItemId } from '../../models/order-item';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

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

  @Input() order!: Order;

  constructor(private router: Router,
              private orderItemService: OrderItemService,
              private userService: UserService) { }

  ngOnInit() { }

  onLoadOrderDetails(order: Order) { 

    const user = new User();

    this.userService.getUser(order.UserId).subscribe({
      next: (orderUser) => {
        user.Id = orderUser['id'];
        user.FirstName = orderUser['firstName'];
        user.LastName = orderUser['lastName'];
        user.Username = orderUser['username'];
        user.Email = orderUser['email'];
        user.Address = orderUser['address'];
        user.Phone = orderUser['phone'];
        user.IsAdmin = orderUser['isAdmin'];
        user.CreatedOn = orderUser['createdOn'];
        user.ModifiedOn = orderUser['modifiedOn'];
      },
      error: (error) => console.error("Error loading user: ", error)
    });

    this.orderItemService.getItemsByOrderId(order.Id).subscribe({
      next: (items) => this.router.navigate(['/order-details'], {state: {order: order, items: items, mode: "view", user: user}}),
      error: (error) => console.error("Error loading order items: ", error)
    });
  }

  ngOnDestroy() { }
}