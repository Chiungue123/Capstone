import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { Medicine } from '../models/medicine';

export class History {

    id: number;
    order: Order;
    inventory: OrderItem[];
    medicine: Medicine;

    constructor(id?: number, order?: Order, inventory?: OrderItem[], medicine?: Medicine) {
        this.id = id || 0;
        this.order = order || new Order();
        this.inventory = inventory || [];
        this.medicine = medicine || new Medicine();
    }

    get Id() {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
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

    get Medicine() {
        return this.medicine;
    }

    set Medicine(value: Medicine) {
        this.medicine = value;
    }

    toString(): string {
        return 'History [id=${this.id}, order=${this.order}, inventory=${this.inventory}, medicine=${this.medicine}]';
    }
}