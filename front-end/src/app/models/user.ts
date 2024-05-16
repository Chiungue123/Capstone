export class User {
    private id: number;
    private firstName: string;
    private lastName: string;
    private username: string;
    private password: string;
    private email: string;
    private address: string;
    private phone: string;
    private isAdmin: Boolean;
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
        isAdmin?: Boolean,
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

    setUser(userObj: any) {
        this.id = userObj.id || 0;
        this.firstName = userObj.firstName || '';
        this.lastName = userObj.lastName || '';
        this.username = userObj.username || '';
        this.password = userObj.password || '';
        this.email = userObj.email || '';
        this.address = userObj.address || '';
        this.phone = userObj.phone || '';
        this.isAdmin = userObj.isAdmin || false;
        this.createdOn = userObj.createdOn ? new Date(userObj.createdOn) : new Date();
        this.modifiedOn = userObj.modifiedOn ? new Date(userObj.modifiedOn) : new Date();
    }

    /*** 
    Difference between get Id() and getId()

    get Id() is a getter method in TypeScript, which allows you to access the 'id' property like a property, not a method. 
    For example, you can do 'let userId = user.Id;' without calling 'Id' as a function.

    getId() is a regular method, and you would need to call it as a function to get the 'id'. 
    For example, you would do 'let userId = user.getId();'.

    Potential issues with different casing in backend and frontend:

    If your backend is sending data in camelCase (like 'id', 'firstName', etc.) and your frontend is using PascalCase for getters and setters (like 'Id', 'FirstName', etc.), 
    it could potentially cause issues when you're trying to map the data from the backend to your User model in the frontend.

    The properties in the JSON object from the backend would not match the names of the getters and setters in your User model, 
    so you would need to manually map each property from the backend data to the corresponding getter/setter in your User model.

    To avoid this issue, it's generally a good practice to keep the casing consistent across your backend and frontend.
    ***/

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

    set IsAdmin(value: Boolean) {
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
