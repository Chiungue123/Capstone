import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(private toastr: ToastrService, 
              private router: Router, 
              private authService: AuthService) { }

  isActive: boolean = false;
  isRegister: boolean = false; // Reveal the register form

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', [Validators.minLength(8)])
  });

  onToggleLogin(): void {
    this.isActive = false; // Show the login form
  }

  onToggleRegister(): void {
    this.isActive = true; // Show the register form
  }

  onValidateEmail() {
    console.log("Sign In Component: onValidateEmail()")

    if (this.validateRestistry()) {
      let user = new User();
      user.Email = this.signUpForm.value.email! 

      this.authService.validate(user).subscribe({
        next: (user: User) => {
          if (user === null) {
            console.log('Email not verified');
            console.log('User: ', user);

          } else {

            console.log("Sign Up Page: Redirecting to Register")
            console.log("Email Value: ", this.signUpForm.value.email!)

            this.router.navigate(['/register'], {state: {email: this.signUpForm.value.email!}});
          }
        },
        error: (error: any) => {
          this.toastr.error('Error Registering Auth: ', error);
        }
      });
    }
  }

  onRegister() {
    console.log("Sign In Component: onRegister()")

  }

  onSignIn() {
    console.log("Sign In Component: onSignIn()")

    if (this.validateUser()) {
      this.toastr.info('Verifying your email and password...');

      let user = new User();
      let email = this.signInForm.value.email ?? "";
      let password = this.signInForm.value.password ?? "";

      this.authService.signIn(user).subscribe({

        next: (user: User) => {
          if (user === null) {
            this.toastr.error('Invalid email or password');
          } else {
            this.toastr.success('Sign In Successful');
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error: any) => {
          this.toastr.error('Invalid email or password');
        }
      });
    } 
  }

  validateRestistry() {

    console.log("ValidateRegistry")
    console.log("Validating Email in sign up form: ", this.signUpForm.value.email!)

    if (this.signUpForm.value.email === '' || this.signUpForm.value.email === null ||
        this.signUpForm.value.email === undefined || !this.signUpForm.value.email.includes("@")) {

        this.toastr.error("Email isn't formatted correctly")
        console.log("Form Data: ", this.signUpForm.value)
        return false;
    } else {

      return true;
    } 
  }

  validateUser() {

    console.log("validateUser()")
    console.log("Validating User Login Info: ", this.signInForm.value)

    if (this.signInForm.value.email === '' 
    || this.signInForm.value.password === '' 
    || this.signInForm.value.email === null 
    || this.signInForm.value.password === null 
    || this.signInForm.value.email === undefined 
    || this.signInForm.value.password === undefined) {
     
      this.toastr.error('Please enter a valid email and password');
      return false;

    } else if (this.signInForm.value.password.length < 8) {

      this.toastr.error('Password must be at least 8 characters long');
      return false;
    }

    return true;
  }

  onTest() {
    console.log("Sign In Component: Redirecting to Registration")
    console.log("Using email@example.com as test value")
    this.router.navigate(['/register'], {state: {email: "email@example.com"}});
  }
}