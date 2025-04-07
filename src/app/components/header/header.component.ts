import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../service/carrinho.service';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../../service/server.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { LogService } from '../../service/log.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialog],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  entrar: boolean = true;
  user: any;
  dropDown: boolean = false;
  carrinho: number = 0;
  isScroll = false;
  players: number = 0;
  account: any;
  profileDropdonw: boolean = false
  animationClass: string = '';
  menuMobile: boolean = false



  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private carrinhoService: CarrinhoService,
    private http: HttpClient,
    private serverService: ServerService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private log: LogService

  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeDropdown();
      }
    });
  }

  ngOnInit(): void {


    const token = localStorage.getItem('token');

    if (token) {
      this.entrar = false;
    } else {
      this.entrar = true;
    }

    this.user = this.auth.getUserFromToken()

    console.log('User: ', this.user)

    this.carrinho = this.carrinhoService.getCarrinho()
    console.log('Carrinho: ', this.carrinho)

    if (this.user) {
      this.serverService.getAccount(this.user.discordId).subscribe({
        next: (res: any) => {
          this.account = res[0]
        },
        error(err) {
          console.error(err)

        },
      })
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Pega a posição de scroll atual
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;


    if (this.menuMobile) {
      this.isScroll = true;
    } else {
      if (scrollPosition > 1) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    }

  }




  getAvatar(userId: string, avatar: string) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
  }


  toggleDropdown() {
    if (this.profileDropdonw) {
      this.animationClass = 'fade-out';
      setTimeout(() => {
        this.profileDropdonw = !this.profileDropdonw;
        this.animationClass = 'fade-in';
      }, 200); // Tempo da animação em ms
    } else {
      this.animationClass = 'fade-out';
      setTimeout(() => {
        this.profileDropdonw = !this.profileDropdonw;
        this.animationClass = 'fade-in';
      }, 200);
    }
  }

  openMenuMobile() {
    this.menuMobile = !this.menuMobile;
    this.isScroll = !this.isScroll;
  }

  closeDropdown() {
    this.animationClass = 'fade-out';
    setTimeout(() => {
      this.profileDropdonw = false;
      this.animationClass = 'fade-in';
    }, 200);
  }

  // Fecha o dropdown ao clicar fora
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dropdownElement = document.querySelector('.profile-dropdown');
    if (this.profileDropdonw && dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  loginWithDiscord() {
    this.log.log('clique_discord').subscribe()
    window.location.href = `${environment.apiUrl}/auth/discord`;

  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você deseja realemte sair?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-sign-out',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sair',
      },
      accept: () => {
        this.auth.logout();
      },
    });
  }
}
