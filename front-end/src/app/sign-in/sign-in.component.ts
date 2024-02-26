import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  isActive: boolean = false;

  constructor() { }

  onToggleLogin(): void {
    this.isActive = false; // Show the login form
  }

  onToggleRegister(): void {
    this.isActive = true; // Show the register form
  }

  onSignIn(): void {
    // Sign in logic
  }

  onRegister(): void {
    // Register logic
  }

}