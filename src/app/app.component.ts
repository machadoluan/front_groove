import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { PrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';
import { CookiesComponent } from "./components/cookies/cookies.component";
import { LogService } from './service/log.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule, ToastModule, CookiesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'login-discord';

  constructor(public router: Router, private route: ActivatedRoute, private log: LogService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.log.log('vinculo_discord').subscribe();
        localStorage.setItem('token', token)
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
    })


    const entrou = sessionStorage.getItem('entrou');
    if (!entrou) {
      this.log.log('acesso_site').subscribe();
      sessionStorage.setItem('entrou', 'true');
    }



  }

  isRegistrationRoute(): boolean {
    const urls = [
      '/cadastro',
      '/allowlist'
    ];

    return urls.some(url => this.router.url.startsWith(url));
  }

}
