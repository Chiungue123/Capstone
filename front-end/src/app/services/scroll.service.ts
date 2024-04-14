import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private sectionSource = new BehaviorSubject<string>('home');
  currentSection = this.sectionSource.asObservable();

  constructor() { }

  changeSection(section: string) {
    this.sectionSource.next(section);
  }
}
