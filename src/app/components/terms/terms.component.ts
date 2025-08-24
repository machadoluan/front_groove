import { Component, OnInit, input } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent implements OnInit {
  title = input('title');
  terms = input('terms');

  constructor(private titleService: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Termos de Serviço - Groove Roleplay');
    this.meta.updateTag({
      name: 'description',
      content: 'Leia os Termos de Serviço do Groove Roleplay.'
    });
  }
}
