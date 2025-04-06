import { Component, input } from '@angular/core';

@Component({
  selector: 'app-terms',
  imports: [],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {
  title = input('title');
  terms = input('terms');
}
