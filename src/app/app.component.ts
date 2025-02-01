import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'login-discord';

  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if(token) {
        localStorage.setItem('token', token)
        this.router.navigate(['/'])
      }
    })
  }

  isRegistrationRoute(): boolean {
    return this.router.url === '/cadastro'; // ajuste o path conforme sua rota
  }
}
