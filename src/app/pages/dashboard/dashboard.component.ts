import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { DiscordService } from '../../service/discord.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastrService } from '../../service/toastr.service';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CreateTicketComponent } from '../../components/create-ticket/create-ticket.component';
import { TicketService } from '../../service/ticket.service';
import { Router } from '@angular/router';
import { TicketComponent } from '../../components/ticket/ticket.component';



@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    InputIcon,
    IconField,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule,
    TableModule,
    InputTextModule,
    ToastModule,
    SelectModule,
    TextareaModule,
    CreateTicketComponent,
    TicketComponent
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: []
})
export class DashboardComponent implements OnInit {
  @ViewChild(CreateTicketComponent, { static: true }) dialogCreateTicket!: CreateTicketComponent;
  @ViewChild(TicketComponent, { static: true }) ticketComponent!: TicketComponent;


  @ViewChild('dt1', { static: true }) dt1!: Table


  // Dados historico suporte
  dataSourceSuporte: historicoSuporte[] = []
  selectedSuporte: any; // Para armazenar a compra selecionada

  user: any;
  avatar: string = '';
  selectedImage: number = 0;
  toggleEdit: boolean = false;
  toggleBtns: boolean = false;
  characters: any[] = [];
  selectedCharacter: any = null
  account: any;
  selectedTab: number = 0;
  cargosDiscord: any[] = []
  dadosUpdate: any;
  formattedCharacters: any;

  dadosOcultos = {
    nome: true,
    email: true,
    telefone: true,
    dataNascimento: true
  };

  allowList: boolean | null = null;

  constructor(
    private auth: AuthService,
    private serverService: ServerService,
    private discordService: DiscordService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private ticketService: TicketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUserFromToken()
    this.user.dataNascimento = this.formData(this.user.dataNascimento)
    this.getTicket()

    this.serverService.getCharacters(this.user.discordId).subscribe(
      (res: any) => {
        this.characters = res
        console.log(this.characters)


        this.formattedCharacters = this.characters.map(c => ({
          ...c,
          displayName: `${c.id} - ${c.name} ${c.name2}`
        }))

        console.log("Fomater", this.formattedCharacters)

        if (this.characters.length > 0) {
          this.selectedCharacter = this.characters[0];  // Seleciona o primeiro character
        }
      },
      (err: any) => {
        console.error(err)
      }
    )


    this.serverService.getAccount(this.user.discordId).subscribe(
      (res: any) => {
        this.account = res[0]
        console.log(this.account)
      },
      (err: any) => {
        console.error(err)

      }
    )

    this.user.avatar = this.getAvatar(this.user.discordId, this.user.avatar)
    console.log(this.user.avatar)

    this.discordService.getUserRoles(this.user.discordId).subscribe(
      (res: any) => {
        this.cargosDiscord = res.roles.filter((role: any) => role !== '@everyone');
      },
      (err) => {
        console.log(err)
      }
    )


    this.dadosUpdate = {
      discordId: this.user.discordId,
      nome: this.user.nome,
      email: this.user.email,
      telefone: this.user.telefone,
      dataNascimento: this.user.dataNascimento
    }


    // VerifyAllowList
    this.serverService.verifyAllowList(this.user.license).subscribe({
      next: (res: any) => {
        this.allowList = res
        console.log(res)
      },
      error: (err) => {
        console.error(err)
      }
    })

  }


  getTicket() {
    this.ticketService.getTicketsUser(this.user.id).subscribe({
      next: (res: any) => {
        this.dataSourceSuporte = res
        console.log(this.dataSourceSuporte)
      }
    })
  }

  getAvatar(userId: string, avatar: string) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
  }

  sair() {
    this.auth.logout()
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
    return valor.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }



  openTicket(ticketId: number) {
    this.ticketComponent.display = true
    this.ticketComponent.loadTickets(ticketId)
  }


  filterGlobal(event: Event, dt1: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt1.filterGlobal(inputValue, 'contains');
  }



  onTabChange(event: number) {
    this.selectedTab = event;
    console.log(this.selectedTab)
  }

  getImageSource(): string {

    const defaultAvatar = 'img/profile_default.jpg';


    if (this.selectedTab === 0 || this.selectedTab === 1) {
      return this.user.avatar;
    } else {
      return this.selectedCharacter?.profilePhoto || defaultAvatar;
    }
  }

  getName(): string {
    if (this.selectedTab === 0) {
      return this.user.username;
    } else if (this.selectCharacter.length < 0) {
      return `${this.selectedCharacter.name} ${this.selectedCharacter.name2}`;
    } else {
      return this.user.username;

    }
  }


  applyFilterGlobal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dt1.filterGlobal(filterValue, 'contains');
  }

  salvarInform() {
    console.log('Antes', this.user)
    console.log('Depois', this.dadosUpdate)
    this.authService.updateAccount(this.dadosUpdate).subscribe({
      next: (res) => {
        if (res.sucess) {
          this.toastrService.showSucess('Informações alteradas');
          localStorage.setItem('token', res.token);
          this.toggleBtns = false
          this.toggleEdit = false
        }
      },
      error: (err) => {
        this.toastrService.showError("Não foi possivel salvar informações, tente novamente mais tarde");
        console.error(err)
      }
    })

  }

  createTicket() {
    this.dialogCreateTicket.showDialog()
  }

  toggleDados(campo: 'nome' | 'email' | 'telefone' | 'dataNascimento') {
    this.dadosOcultos[campo] = !this.dadosOcultos[campo];
  }

  editDados() {
    this.toggleEdit = !this.toggleEdit;
    this.toggleBtns = !this.toggleBtns;
  }

  atualizarListaTickets() {
    this.ticketService.getTicketsUser(this.user.id).subscribe(
      (tickets) => {
        this.dataSourceSuporte = tickets as historicoSuporte[];
      },
      (error) => {
        console.error('Erro ao atualizar tickets', error);
      }
    );
  }

}
