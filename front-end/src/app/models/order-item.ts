import { Medicine } from "./medicine";
import { Order } from "./order";

export class OrderItem {
    private id: OrderItemId;
    private order: Order;
    private medicine: Medicine;
    private quantity: number;
    private cost: number;

    constructor(id?: OrderItemId, order?: Order, medicine?: Medicine, quantity?: number, cost?: number) {
        this.id = id || new OrderItemId();
        this.order = order || new Order();
        this.medicine = medicine || new Medicine();
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

    set Order(value: Order) {
        this.order = value;
    }

    get Medicine() {
        return this.medicine;
    }

    set Medicine(value: Medicine) {
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
        return `OrderItem [id=${this.id}, quantity=${this.quantity}, cost=${this.cost}]`;
    }
}

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