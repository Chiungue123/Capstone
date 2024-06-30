import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  sub!: Subscription;
  email!: string;
  currentStep: number = 1;

  constructor(private toastr: ToastrService, 
              private router: Router, 
              private authService: AuthService) {
    
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {

      const state = navigation.extras.state as {email: string}
      this.email = state.email;
      console.log("Registration Page")
      console.log("Email: ", this.email)

      this.validateEmail(this.email);
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
  });

  onNext() {
    this.currentStep ++;
    this.changeSlide();
  }

  onPrevious() {
    this.currentStep --;
    this.changeSlide();
  }

  changeSlide(): void {

    // Use querySelector to get the slides container and assert it as HTMLElement
    const slidesContainer = document.querySelector('.slides-container') as HTMLElement;
    const slideWidth = 350; // Width of individual slide

    if (slidesContainer) {
      console.log("Transform: ", `translateX(-${(this.currentStep - 1) * slideWidth}px)`);
      slidesContainer.style.transform = `translateX(-${(this.currentStep - 1) * slideWidth}px)`;
    } else {
      console.error("Slides container not found.");
    }
  }

  // Add this method in your component class
  isPasswordMatching(): boolean {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }

  // Modify your onSubmit method to include this check
  onSubmit() {
    console.log("Register Form: ", this.registerForm.value)

    if (this.registerForm.valid && this.isPasswordMatching()) {

      let user = new User();

      user.FirstName = this.registerForm.get('firstName')?.value || "";
      user.LastName = this.registerForm.get('lastName')?.value || "";
      user.Username = this.registerForm.get('username')?.value || "";
      user.Password = this.registerForm.get('password')?.value || "";
      user.Address = this.registerForm.get('address')?.value || "";
      user.Phone = this.registerForm.get('phone')?.value || "";
      user.IsAdmin = this.registerForm.get('isAdmin')?.value || false;
      user.CreatedOn = new Date();
      user.ModifiedOn = new Date();
      user.Email = this.email;

      if (this.validateUser(user)) {
        this.authService.register(user).subscribe({
          next: (user) => {
            console.log("User Registered: ", user);
            this.toastr.success('User registered successfully.');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error("Error registering user: ", error);
            this.toastr.error('Error registering user.');
          }
        });
      } else {
        this.toastr.error('User not valid.');
      }

    } else {

      this.toastr.error('Passwords do not match.');
    }
  }

  validateUser(user: User): boolean {
    if (user === null || user === undefined) {
      this.toastr.error("User Not Valid: Redirecting to Login")
      return false;

    } else if (user.FirstName === '' || user.LastName === '') {
      this.toastr.error("User First and Last Name Invalid")
      return false;

    } else if (user.Username === '' || user.Password === '') {
      this.toastr.error("User Username or Password Invalid")
      return false;

    } else if (user.Address === '' || user.Phone === '') {
      this.toastr.error("User Address or Phone Invalid")
      return false;

    } else if (user.Email === '' || user.Email === null || user.Email === undefined) {
      this.toastr.error("User Email Invalid")
      return false;

    } else {
      console.log("Registration Page: User Verified")
      return true;
    }
  }

  validateEmail(email: string) {
    if (email === '' || email === null ||
      email === undefined || !email.includes("@")) {
      this.toastr.error("Incorrectly Formatted Email: Redirecting to Login")
      this.router.navigate(['/login'])
    } else {
      console.log("Registration Page: Email Verified")
    }
  }

  /*onTest() {
    let user = new User();

    user.FirstName = "Test";
    user.LastName = "User";
    user.Username = "testuser";
    user.Password = "password";
    user.Address = "123 Test St";
    user.Phone = "1234567890";
    user.Email = "test@example.com";
    user.IsAdmin = false;

    let currentTime = new Date();
    user.CreatedOn = currentTime;
    user.ModifiedOn = currentTime;

    console.log("User Details: ", user)
    console.log(user.Email);

    console.log("Navigating to Dashboard")
    // Reading undefined in the dashboard component
    this.router.navigate(['/dashboard'], { state: { user } });
  }*/
/*

IMPLEMENTING HASHING FOR SECURITY

Hashing should indeed be handled on the backend. 
The plaintext password (after confirming it matches the confirm password field on the frontend) 
should be sent over a secure connection (HTTPS), 
where the backend will hash it before storing it in the database.

*/
}