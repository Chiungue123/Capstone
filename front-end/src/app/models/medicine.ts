export class Medicine {
    private id: number;
    private name: string;
    private brand: string;
    private stock: number;

    constructor(id?: number, name?: string, brand?: string, stock?: number) {
        this.id = id || 0;
        this.name = name || '';
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