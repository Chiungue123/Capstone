import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userForm!: FormGroup;
  isEditMode: boolean = false;
  sub!: Subscription;
  user: User = new User();
  isDarkMode: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService,
    private fb: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as { user: User }
      this.user = state.user;
      console.log("User Details: User from State: ", this.user);
    }
  }

  ngOnInit() { 
    this.initializeForm(this.user);
  }

  initializeForm(user: User): FormGroup {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    })

    this.userForm.patchValue({
      firstName: user.FirstName,
      lastName: user.LastName,
      username: user.Username,
      email: user.Email,
      address: user.Address,
      phone: user.Phone
    });

    return this.userForm;
  }

  onUpdate() {

    console.log("User Details: Submitting User Details: ", this.userForm.value);

    this.user.FirstName = this.userForm.value.firstName;
    this.user.LastName = this.userForm.value.lastName;
    this.user.Username = this.userForm.value.username;
    this.user.Email = this.userForm.value.email;
    this.user.Address = this.userForm.value.address;
    this.user.Phone = this.userForm.value.phone;

    console.log("User Details: Updated User: ", this.user);

    this.userService.updateUser(this.user).subscribe({
      next: (user: User) => {
        console.log("User Details: User Updated: ", user);
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.log("User Details: Error Updating User: ", error);
      }
    });
  }

  onDelete(user: User) {
    console.log("User Details: Deleting User: ", this.user);

    this.userService.deleteUser(this.user.Id).subscribe({
      next: () => {
        console.log("User Details: User Deleted: ", this.user);
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.log("User Details: Error Deleting User: ", error);
      }
    });
  }

  onGoBack() {
    console.log("User Details: Returning to Dashboard")
    this.router.navigate(['/dashboard']);
  }

  /*ngOnDestroy() {
    this.sub.unsubscribe();
  }*/

  /*** Theme Section ***/

  toggleTheme(value: string) {
    if (value === 'dark') {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = false;
    }
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateTheme();
  }
  
  updateTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
