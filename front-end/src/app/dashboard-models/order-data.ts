import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';

export class OrderData {

    order: Order;
    inventory: OrderItem[];

    constructor(order?: Order, inventory?: OrderItem[]) {
        this.order = order || new Order();
        this.inventory = inventory || [];
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

    toString(): string {
        return 'OrderData [id=${this.id}, order=${this.order}, inventory=${this.inventory}, medicine=${this.medicine}]';
    }
}