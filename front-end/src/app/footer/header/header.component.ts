import { Component } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private scrollService: ScrollService,
    private router: Router
  ) {}

  scrollToSection(sectionId: string) {
    this.scrollService.changeSection(sectionId);
  }

  onLogOut() {
    this.router.navigate(['/login']);
  }
}