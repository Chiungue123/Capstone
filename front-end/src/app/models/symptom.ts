export class Symptom {
    id: number;
    description: string;

    constructor(id?: number, description?: string) {
        this.id = id || 0;
        this.description = description || '';
    }

    get Id() {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get Description(): string {
        return this.description;
    }

    set Description(value: string) {
        this.description = value;
    }

    toString(): string {
        return `Symptom [id=${this.id}, description=${this.description}]`;
    }
}