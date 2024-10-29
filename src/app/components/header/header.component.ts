import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../service/carrinho.service';

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

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {

    const token = localStorage.getItem('Token');

    if (token) {
      this.entrar = false;
    } else {
      this.entrar = true;
    }

    this.user = this.auth.getUserFromToken()

    console.log('User: ', this.user)

    this.carrinho = this.carrinhoService.getCarrinho()
    console.log('Carrinho: ', this.carrinho)
  }

  login() {
    this.dialog.open(LoginComponent)
  }

  getAvatar(userId: string, avatar: string) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
  }
}
