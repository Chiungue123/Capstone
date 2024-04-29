export class OrderItemId {
    constructor(public orderId: number = 0, public medicineId: number = 0) {}
}

export class OrderItem {
    private id: OrderItemId;
    private quantity: number;
    private cost: number;

    constructor(id?: OrderItemId, quantity?: number, cost?: number) {
        this.id = id || new OrderItemId();
        this.quantity = quantity || 0;
        this.cost = cost || 0;
    }

    get Id() {
        return this.id;
    }

    set Id(value: OrderItemId) {
        this.id = value;
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