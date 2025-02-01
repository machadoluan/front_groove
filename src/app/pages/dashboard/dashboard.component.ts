import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { historicoCompra, historicoSuporte } from '../../types/models.type';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        MatTabsModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  // Dados Historico de compras
  displayedColumnsCompras: string[] = ['nome', 'dataCompra', 'produto', 'valor'];
  dataSourceCompra: historicoCompra[] = [];

  // Dados historico suporte
  displayedColumnsSuporte: string[] = ['nome', 'dataSuporte', 'personagem', 'status'];
  dataSourceSuporte: historicoSuporte[] = []

  user: any;
  avatar: string = '';
  selectedImage: number = 0;


  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUserFromToken()
    this.user.dataNascimento = this.formData(this.user.dataNascimento)
  } 

  getAvatar(userId: string, avatar: string) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
  }

  sair() {
    this.auth.logout()
  }

  selectImage(index: number) {
    this.selectedImage = index;
  }

  formData(data: string): string {
    const date = new Date(data)
    const dia = String(date.getDate()).padStart(2, '0')
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const ano = date.getFullYear()

    return `${dia}/${mes}/${ano}`
  }
}
