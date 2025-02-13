import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../service/carrinho.service';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../../service/server.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
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


  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private carrinhoService: CarrinhoService,
    private http: HttpClient,
    private serverService: ServerService
  ) { }

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
    this.getPlayers()

    this.serverService.getAccount(this.user.discordId).subscribe({
      next: (res: any) => {
        this.account = res[0]
      },
      error(err) {
        console.error(err)
        
      },
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Pega a posição de scroll atual
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Se a posição for maior que 0, adiciona a classe, senão remove
    if (scrollPosition > 1) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }

  login() {
    this.dialog.open(LoginComponent)
  }

  getAvatar(userId: string, avatar: string) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
  }

  async getPlayers() {
    await this.http.get('https://servers-frontend.fivem.net/api/servers/single/l69px7').subscribe((res: any) => {
      this.players = res.Data.clients
    })
  }
}
