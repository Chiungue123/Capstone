import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() user!: User;

  constructor(private router: Router) { }

  ngOnInit() { }

  ngOnDestroy() { }

  onLoadUserDetails(id: number) {
    console.log("Load User Details ID:", id)
    this.router.navigate(['/user/details', id]);
  }

}
