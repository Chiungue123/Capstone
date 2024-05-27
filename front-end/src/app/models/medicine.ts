export class Medicine {
    private id: number;
    private name: string;
    private price: number;
    private brand: string;
    private stock: number;

    constructor(id?: number, name?: string, price?: number, brand?: string, stock?: number) {
        this.id = id || 0;
        this.name = name || '';
        this.price = price || 0;
        this.brand = brand || '';
        this.stock = stock || 0;
    }

    get Id() {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get Name() {
        return this.name;
    }

    set Name(value: string) {
        this.name = value;
    }

    get Price() {
        return this.price;
    }

    set Price(value: number) {
        this.price = value;
    }

    get Brand() {
        return this.brand;
    }

    set Brand(value: string) {
        this.brand = value;
    }

    get Stock() {
        return this.stock;
    }

    set Stock(value: number) {
        this.stock = value;
    }

    toString(): string {
        return `Medicine [id=${this.id}, name=${this.name}, brand=${this.brand}, stock=${this.stock}]`;
    }
}