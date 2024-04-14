import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private sectionSubscription!: Subscription;

  user!: User;
  position: string = "Admin";
  FirstName: string = "Rodger";

  constructor(private toastr: ToastrService,
              private router: Router,
              private scrollService: ScrollService) {

    /*const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      
      const state = navigation.extras.state as { user: User }
      this.user = state.user;
      console.log("Dashboard Page");
      console.log("User: ", this.user);

      this.validateUser(this.user);
    }*/
  }

  ngOnInit() {
    console.log("Dashboard Page: NgOnInit");
    this.sectionSubscription = this.scrollService.currentSection.subscribe(section => {
      this.scrollToSection(section);
    });
  }

  scrollToSection(sectionId: string) {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  validateUser(user: User) {
    console.log("User: ", user)

    if (user.Email === '' || user.Email === null ||
      user.Email === undefined || !user.Email.includes("@")) {

      this.toastr.error("Incorrectly Formatted Email: Redirecting to Login")
      this.router.navigate(['/login'])
    } else {
       console.log("Registration Page: Email Verified")
    }
  }

  ngOnDestroy() {
    this.sectionSubscription.unsubscribe();
  }
}