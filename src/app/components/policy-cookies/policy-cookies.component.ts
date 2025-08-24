import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-policy-cookies',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './policy-cookies.component.html',
  styleUrl: './policy-cookies.component.scss'
})
export class PolicyCookiesComponent implements OnInit {
  constructor(private titleService: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Política de Cookies - Groove Roleplay');
    this.meta.updateTag({
      name: 'description',
      content: 'Entenda como usamos cookies no Groove Roleplay.'
    });
  }
}
