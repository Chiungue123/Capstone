export class Order {
    private id: number;
    private shipFrom: string;
    private shipTo: string;
    private cost: number;
    private createdOn: Date;
    private modifiedOn: Date;
    private status: string; // Pending, Shipped, Delivered
    private userId: number;

    constructor(id?: number, shipFrom?: string, shipTo?: string, cost?: number, 
                createdOn?: Date, modifiedOn?: Date, status?: string, userId?: number) {
        this.id = id || 0;
        this.shipFrom = shipFrom || '';
        this.shipTo = shipTo || '';
        this.cost = cost || 0;
        this.createdOn = createdOn || new Date();
        this.modifiedOn = modifiedOn || new Date();
        this.status = status || 'Pending';
        this.userId = userId || 0;
    }

    static fromJson(json: any): Order {
        return new Order(json.id, json.shipFrom, json.shipTo, json.cost, new Date(json.createdOn), new Date(json.modifiedOn), json.status, json.userId);
    }

    get Id() {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get ShipFrom() {
        return this.shipFrom;
    }

    set ShipFrom(value: string) {
        this.shipFrom = value;
    }

    get ShipTo() {
        return this.shipTo;
    }

    set ShipTo(value: string) {
        this.shipTo = value;
    }

    get Cost() {
        return this.cost;
    }

    set Cost(value: number) {
        this.cost = value;
    }

    get CreatedOn() {
        return this.createdOn;
    }

    set CreatedOn(value: Date) {
        this.createdOn = value;
    }

    get ModifiedOn() {
        return this.modifiedOn;
    }

    set ModifiedOn(value: Date) {
        this.modifiedOn = value;
    }

    get Status() {
        return this.status;
    }

    set Status(value: string) {
        this.status = value;
    }

    get UserId() {
        return this.userId;
    }

    set UserId(value: number) {
        this.userId = value;
    }

    toString(): string {
        return `Order [id=${this.id}, shipFrom=${this.shipFrom}, shipTo=${this.shipTo}, cost=${this.cost}, createdOn=${this.createdOn}, modifiedOn=${this.modifiedOn}, orderStatus=${this.status} userId=${this.userId}]`;
    }
}