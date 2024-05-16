import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

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
  isAddMode: boolean = false;
  sub!: Subscription;
  user: User = new User();
  isDarkMode: boolean = false;

  constructor(
    private router: Router, 
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  
  ) {
    this.userForm = this.fb.group({});
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as { mode: string, user: User }
      
      if (state.user && state.mode === "view") {
        //console.log("View User Mode")
        this.user = state.user;
        this.isEditMode = false;
        this.isAddMode = false;
        this.userForm = this.updateForm(this.user);

      } else if (state.mode === "add" && !state.user) {
        //console.log("Add User Mode")
        this.isAddMode = true;
        this.userForm = this.addForm();
      
      } else {
        console.log("Mode is neither view nor add")
        console.log("Mode: ", state.mode)
        console.log("User: ", state.user)
        console.log("isEditMode: ", this.isEditMode)
        console.log("isAddMode: ", this.isAddMode)
      } 
    }
  }

  addForm(): FormGroup {
    
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      position: ['', Validators.required]
    });

    return this.userForm;
  }

  updateForm(user: User): FormGroup {

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

    //console.log("User Details: User Form: ", this.userForm.value)
    return this.userForm;
  }

  onAdd() {

    const user = new User();

    user.FirstName = this.userForm.value.firstName;
    user.LastName = this.userForm.value.lastName;
    user.Username = this.userForm.value.username;
    user.Email = this.userForm.value.email;
    user.Address = this.userForm.value.address;
    user.Phone = this.userForm.value.phone;
    user.Password = this.userForm.value.password;
    user.IsAdmin = this.userForm.get('position')?.value || false;

    if (this.validateAddForm(this.userForm)) {
      this.userService.addUser(user).subscribe({
        next: () => {
          this.toastr.success("User Added Successfully");
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.log("User Details: Error Adding User: ", error);
        }
      });
    }  
  }

  validateAddForm(userForm: FormGroup): boolean {
    if (this.userForm.value.password !== this.userForm.value.confirmPassword) {
      this.toastr.error("Passwords Don't Match");
      return false;

    } else if (this.userForm.value.password.length < 8) {
      this.toastr.error("Password Must Be At Least 8 Characters");
      return false;

    } else if (this.userForm.value.firstName === '' || 
               this.userForm.value.lastName === '' || 
               this.userForm.value.username === '' || 
               this.userForm.value.email === '' || 
               this.userForm.value.address === '' || 
               this.userForm.value.phone === '') {
      this.toastr.error("Missing Required Fields");
      return false;

    } else {
      return true;
    }
  }

  onUpdate() {
    //console.log("User Details: New User: ", this.userForm.value)
    const updatedUser = new User();

    updatedUser.Id =  this.user.Id, 
    updatedUser.FirstName = this.userForm.value.firstName,
    updatedUser.LastName = this.userForm.value.lastName,
    updatedUser.Username = this.userForm.value.username,
    updatedUser.Password = this.user.Password,
    updatedUser.Email = this.userForm.value.email,
    updatedUser.Address = this.userForm.value.address,
    updatedUser.Phone = this.userForm.value.phone,
    updatedUser.IsAdmin = this.user.IsAdmin,
    updatedUser.CreatedOn = this.user.CreatedOn,
    updatedUser.ModifiedOn = new Date()

    // Only update if there's a change
    if (JSON.stringify(this.user) !== JSON.stringify(updatedUser)) {
      this.userService.updateUser(updatedUser).subscribe({
        next: (user: User) => {
          this.toastr.show('User updated successfully');
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.log("User Details: Error Updating User: ", error);
        }
      });
    } else {
      this.toastr.show('No changes to update');
    }
  }


  onDelete(user: User) {
    //console.log("User Details: Deleting User: ", this.user);

    this.userService.deleteUser(this.user.Id).subscribe({
      next: () => {
        console.log("User Details: User Deleted: ", this.user);
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.log("User Details");
        console.log("Error Deleting User: ", error);
      }
    });
  }

  onGoBack() {
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
