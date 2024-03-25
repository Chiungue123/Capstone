import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  sub!: Subscription;
  email!: string;

  constructor(private toastr: ToastrService, 
              private router: Router, 
              private authService: AuthService) {
    
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {

      const state = navigation.extras.state as {email: string}
      this.email = state.email;
      console.log("Registration Page")
      console.log("Email: ", this.email)

      if (this.email === '' || this.email === null ||
        this.email === undefined || !this.email.includes("@")) {

        this.toastr.error("Incorrectly Formatted Email: Redirecting to Login")
        this.router.navigate(['/login'])
      } else {
         console.log("Registration Page: Email Verified")
      }
    }
  }

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false)
    //createdOn: new FormControl([new Date()]),
    //modifiedOn: new FormControl([new Date()])
  });

  // Add this method in your component class
  isPasswordMatching(): boolean {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }

  // Modify your onSubmit method to include this check
  onSubmit() {
    if (this.registerForm.valid && this.isPasswordMatching()) {
      // Proceed with submission logic
    } else {
      // Handle validation errors or mismatched passwords
      this.toastr.error('Passwords do not match.');
    }
  }

  /*

  When you're ready to implement hashing, 
  it should indeed be handled on the backend. 
  The plaintext password (after confirming it matches the confirm password field on the frontend) 
  should be sent over a secure connection (HTTPS), 
  where the backend will hash it before storing it in the database.

  */
}
