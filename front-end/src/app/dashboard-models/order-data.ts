import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { User } from '../models/user';

export class OrderData {

    order: Order;
    inventory: OrderItem[];
    user: User;

    constructor(order?: Order, inventory?: OrderItem[], user?: User) {
        this.order = order || new Order();
        this.inventory = inventory || [];
        this.user = user || new User();
    }

    get Order() {
        return this.order;
    }

    set Order(value: Order) {
        this.order = value;
    }

    get Inventory() {
        return this.inventory;
    }

    set Inventory(value: OrderItem[]) {
        this.inventory = value;
    }

    get User() {
        return this.user;
    }

    set User(value: User) {
        this.user = value;
    }

    toString(): string {
        return `OrderData [Order ID=${this.order['id']}, order=${this.order}, inventory=${this.inventory}, user=${this.user}]`;
    }
}