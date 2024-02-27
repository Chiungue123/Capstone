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
        id: number,
        firstName: string,
        lastName: string,
        username: string,
        password: string,
        email: string,
        address: string,
        phone: string,
        isAdmin: boolean,
        createdOn: Date,
        modifiedOn: Date
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.isAdmin = isAdmin;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
    }
}
