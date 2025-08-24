import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss'
})
export class PolicyComponent implements OnInit {
  constructor(private titleService: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Política de Privacidade - Groove Roleplay');
    this.meta.updateTag({
      name: 'description',
      content: 'Saiba como tratamos seus dados pessoais no Groove Roleplay.'
    });
  }
}
