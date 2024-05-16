import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  //userForm: FormGroup;

  constructor() { 

  }

  ngOnInit() { }

  ngOnDestroy() { }

  onSubmit() { 
    //console.log('User Form: ', this.userForm.value);

  }

}
