import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { historicoCompra, historicoSuporte } from '../../types/models.type';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
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
  dataSourceCompra: historicoCompra[] = [
    { nome: 'Enzo da Silva', dataCompra: '15/05/2024', produto: 'Pack 30.000 diamantes', valor: 850 },
    { nome: 'Maria Oliveira', dataCompra: '15/05/2024', produto: 'Pack 30.000 diamantes', valor: 850 },
    { nome: 'João Santos', dataCompra: '15/05/2024', produto: 'Pack 30.000 diamantes', valor: 850 },
    { nome: 'Enzo da Silva', dataCompra: '15/05/2024', produto: 'Pack 30.000 diamantes', valor: 850 },
    { nome: 'Maria Oliveira', dataCompra: '15/05/2024', produto: 'Pack 30.000 diamantes', valor: 850 },
    { nome: 'João Santos', dataCompra: '15/05/2024', produto: 'Pack 30.000 diamantes', valor: 850 },
    { nome: 'Enzo da Silva', dataCompra: '15/05/2024', produto: 'Pack 30.000 diamantes', valor: 850 },
    { nome: 'Maria Oliveira', dataCompra: '15/05/2024', produto: 'Pack 30.000 diamantes', valor: 850 },
    { nome: 'João Santos', dataCompra: '15/05/2024', produto: 'Pack 30.000 diamantes', valor: 850 },
    { nome: 'Enzo da Silva', dataCompra: '15/05/2024', produto: 'Pack 30.000 diamantes', valor: 850 }

  ];

  // Dados historico suporte
  displayedColumnsSuporte: string[] = ['nome', 'dataSuporte', 'personagem', 'status'];
  dataSourceSuporte: historicoSuporte[] = [
    { nome: 'Carro desaparecido', dataSuporte: '15/04/2021', personagem: 'Bia Machada', status: 'Em andamento' },
    { nome: 'Problema com login', dataSuporte: '16/04/2021', personagem: 'João Silva', status: 'Resolvido' },
    { nome: 'Erro de conexão', dataSuporte: '17/04/2021', personagem: 'Maria Oliveira', status: 'Em andamento' },
    { nome: 'Dúvida sobre pagamento', dataSuporte: '18/04/2021', personagem: 'Enzo da Silva', status: 'Resolvido' },
  ]



  user: any
  avatar: string = '';
  selectedImage: number = 0;


  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUserFromToken()
    console.log('User: ', this.user)
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
}
