export class Register {
    email: string;
    password: string;
    isVerified: boolean;

    constructor(email: string, password: string, isVerified: boolean) {
        this.email = email;
        this.password = password;
        this.isVerified = false;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getIsVerified(): boolean {
        return this.isVerified;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setIsVerified(isVerified: boolean) {
        this.isVerified = isVerified;
    }
}
