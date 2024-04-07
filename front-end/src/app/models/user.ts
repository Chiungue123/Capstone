export class User {
    private id: number;
    private firstName: string;
    private lastName: string;
    private username: string;
    private password: string;
    private email: string;
    private address: string;
    private phone: string;
    private isAdmin: boolean;
    private createdOn: Date;
    private modifiedOn: Date;

    constructor(
        id?: number,
        firstName?: string,
        lastName?: string,
        username?: string,
        password?: string,
        email?: string,
        address?: string,
        phone?: string,
        isAdmin?: boolean,
        createdOn?: Date,
        modifiedOn?: Date
    ) {
        this.id = id || 0;
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.username = username || '';
        this.password = password || '';
        this.email = email || '';
        this.address = address || '';
        this.phone = phone || '';
        this.isAdmin = isAdmin || false;
        this.createdOn = createdOn || new Date();
        this.modifiedOn = modifiedOn || new Date();
    }

    get Id() {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get FirstName() {
        return this.firstName;
    }

    set FirstName(value: string) {
        this.firstName = value;
    }

    get LastName() {
        return this.lastName;
    }

    set LastName(value: string) {
        this.lastName = value;
    }

    get Username() {
        return this.username;
    }

    set Username(value: string) {
        this.username = value;
    }

    get Password() {
        return this.password;
    }

    set Password(value: string) {
        this.password = value;
    }

    get Email() {
        return this.email;
    }

    set Email(value: string) {
        this.email = value;
    }

    get Address() {
        return this.address;
    }

    set Address(value: string) {
        this.address = value;
    }

    get Phone() {
        return this.phone;
    }

    set Phone(value: string) {
        this.phone = value;
    }

    get IsAdmin() {
        return this.isAdmin;
    }

    set IsAdmin(value: boolean) {
        this.isAdmin = value;
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
}
