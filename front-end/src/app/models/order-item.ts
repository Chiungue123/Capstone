import { Medicine } from '../models/medicine';
import { Order } from '../models/order';

export class OrderItemId {
    private orderId: number;
    private medicineId: number;

    constructor(orderId?: number, medicineId?: number) {
        this.orderId = orderId || 0;
        this.medicineId = medicineId || 0;
    }

    get OrderId() {
        return this.orderId;
    }

    set OrderId(value: number) {
        this.orderId = value;
    }

    get MedicineId() {
        return this.medicineId;
    }

    set MedicineId(value: number) {
        this.medicineId = value;
    }
}

export class OrderItem {
    private id: OrderItemId;
    private order: any; // Use the appropriate type for Order
    private medicine: any; // Use the appropriate type for Medicine
    private quantity: number;
    private cost: number;

    constructor(id?: OrderItemId, order?: any, medicine?: any, quantity?: number, cost?: number) {
        this.id = id || new OrderItemId();
        this.order = order || null;
        this.medicine = medicine || null;
        this.quantity = quantity || 0;
        this.cost = cost || 0;
    }

    get Id() {
        return this.id;
    }

    set Id(value: OrderItemId) {
        this.id = value;
    }
    get Order() {
        return this.order;
    }

    set Order(value: Order) { // Use the appropriate type for Order
        this.order = value;
    }

    get Medicine() {
        return this.medicine;
    }

    set Medicine(value: Medicine) { // Use the appropriate type for Medicine
        this.medicine = value;
    }

    get Quantity() {
        return this.quantity;
    }

    set Quantity(value: number) {
        this.quantity = value;
    }

    get Cost() {
        return this.cost;
    }

    set Cost(value: number) {
        this.cost = value;
    }

    toString(): string {
        return `OrderItem [id=${this.id}, order=${this.order}, medicine=${this.medicine}, quantity=${this.quantity}, cost=${this.cost}]`;
    }
}