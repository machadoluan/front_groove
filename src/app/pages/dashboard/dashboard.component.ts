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
import { ServerService } from '../../service/server.service';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Tag } from 'primeng/tag';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule,
    TableModule,
    InputTextModule,
    IconField,
    InputIcon,
    Tag
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
  dataSourceCompra: historicoCompra[] = [
    { nome: 'João Silva', dataCompra: '2023-10-01', produto: 'Notebook', valor: 2500 },
    { nome: 'Maria Oliveira', dataCompra: '2023-09-28', produto: 'Smartphone', valor: 1200 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 },
    { nome: 'Carlos Souza', dataCompra: '2023-09-25', produto: 'Tablet', valor: 800 }
  ];

  selectedCompra: any; // Para armazenar a compra selecionada


  // Dados historico suporte
  dataSourceSuporte: historicoSuporte[] = [
    { nome: "Teste", dataSuporte: "Teste", personagem: "john wick", status: 'Aguardando' }
  ]

  user: any;
  avatar: string = '';
  selectedImage: number = 0;
  toggleEdit: boolean = false;
  toggleBtns: boolean = false;
  characters: any[] = [];
  selectedCharacter: any = null
  Account: any

  constructor(
    private auth: AuthService,
    private serverService: ServerService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUserFromToken()
    this.user.dataNascimento = this.formData(this.user.dataNascimento)

    this.serverService.getCharacters(this.user.discordId).subscribe(
      (res: any) => {
        this.characters = res
        console.log(this.characters)

        if (this.characters.length > 0) {
          this.selectedCharacter = this.characters[0];  // Seleciona o primeiro character
        }
      },
      (err) => {
        console.error(err)
      }
    )

    this.serverService.getAccount(this.user.discordId).subscribe(
      (res: any) => {
        this.Account = res[0]
        console.log(this.Account)
      },
      (err) => {
        console.error(err)
      }
    )
  }

  getAvatar(userId: string, avatar: string) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
  }

  sair() {
    this.auth.logout()
  }

  getSeverity(status: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (status) {
      case 'Aguardando':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':
        return undefined;

      default:
        return undefined;
    }
  }

  selectCharacter(character: any) {
    this.selectedCharacter = character;

    console.log("Character selecionado:", this.selectedCharacter)
  }

  formData(data: string): string {
    const date = new Date(data)
    const dia = String(date.getDate()).padStart(2, '0')
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const ano = date.getFullYear()

    return `${dia}/${mes}/${ano}`
  }

  formatarDinheiro(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  editDados() {
    this.toggleEdit = true;
    this.toggleBtns = true;
  }


  filterGlobal(event: Event, dt1: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt1.filterGlobal(inputValue, 'contains');
  }


}
