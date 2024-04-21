export class Order {
    private id: number;
    private shipFrom: string;
    private shipTo: string;
    private cost: number;
    private createdOn: Date;
    private modifiedOn: Date;
    private userId: number;
    private user: any; // Use the appropriate type for User

    constructor(id?: number, shipFrom?: string, shipTo?: string, cost?: number, 
                createdOn?: Date, modifiedOn?: Date, userId?: number, user?: any) {
        this.id = id || 0;
        this.shipFrom = shipFrom || '';
        this.shipTo = shipTo || '';
        this.cost = cost || 0;
        this.createdOn = createdOn || new Date();
        this.modifiedOn = modifiedOn || new Date();
        this.userId = userId || 0;
        this.user = user || null;
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

    get UserId() {
        return this.userId;
    }

    set UserId(value: number) {
        this.userId = value;
    }

    get User() {
        return this.user;
    }

    set User(value: any) { // Use the appropriate type for User
        this.user = value;
    }

    toString(): string {
        return `Order [id=${this.id}, shipFrom=${this.shipFrom}, shipTo=${this.shipTo}, cost=${this.cost}, 
                createdOn=${this.createdOn}, modifiedOn=${this.modifiedOn}, userId=${this.userId}, user=${this.user}]`;
    }
}