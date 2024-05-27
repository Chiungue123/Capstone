import { Component, Input } from '@angular/core';
import { Symptom } from '../../models/symptom';

@Component({
  selector: 'app-symptom-card',
  standalone: true,
  imports: [],
  templateUrl: './symptom-card.component.html',
  styleUrl: './symptom-card.component.css'
})
export class SymptomCardComponent {

  @Input() symptom!: Symptom;

  constructor() { }

  ngOnInit() { }

  onLoadSymptomDetails(symptom: Symptom) {} 

  ngOnDestroy() { }

}
