import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr: ToastrService) { }

  isActive: boolean = false;

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onToggleLogin(): void {
    this.isActive = false; // Show the login form
  }

  onToggleRegister(): void {
    this.isActive = true; // Show the register form
  }

  onRegister() {
    console.log(this.signUpForm.value);
  }

  onSignIn() {
    console.log(this.signInForm.value);
  }
}
