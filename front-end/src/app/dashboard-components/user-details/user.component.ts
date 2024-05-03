import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    private userService: UserService
  ) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as { user: User }
      this.user = state.user;
    }
  }

  ngOnInit() { 
    console.log("NgOnInit User Details Page ");
    console.log("User Details: ", this.user);
    this.initializeForm();
  }

  initializeForm(): FormGroup {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      isAdmin: new FormControl(''),
      createdOn: new FormControl(''),
      modifiedOn: new FormControl('')
    })

    this.userForm.patchValue({
      id: this.user.Id,
      firstName: this.user.FirstName,
      lastName: this.user.LastName,
      username: this.user.Username,
      email: this.user.Email,
      address: this.user.Address,
      phone: this.user.Phone,
      isAdmin: this.user.IsAdmin,
      createdOn: this.user.CreatedOn,
      modifiedOn: this.user.ModifiedOn
    });

    return this.userForm;
  }

  onUpdate() {

    console.log("User Details: Submitting User Details: ", this.userForm.value);

    this.user.Id = this.userForm.value.id;
    this.user.FirstName = this.userForm.value.firstName;
    this.user.LastName = this.userForm.value.lastName;
    this.user.Username = this.userForm.value.username;
    this.user.Email = this.userForm.value.email;
    this.user.Address = this.userForm.value.address;
    this.user.Phone = this.userForm.value.phone;
    this.user.IsAdmin = this.userForm.value.isAdmin;
    this.user.CreatedOn = this.userForm.value.createdOn;
    this.user.ModifiedOn = this.userForm.value.modifiedOn;

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

  onDelete() {

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
