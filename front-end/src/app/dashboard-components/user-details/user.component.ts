import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  sub!: Subscription;
  user!: User;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.userService.getUser(params['id']).subscribe(user => {
        this.user = user;
        console.log("User Details Component")
        console.log("User:", this.user);
      });
    });
  }

  ngOnInit() { }

  onGoBack() {
    console.log("User Details: Returning to Dashboard")
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
