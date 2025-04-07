import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ServerService } from '../../service/server.service';
import { AuthService } from '../../service/auth.service';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TicketService } from '../../service/ticket.service';
import { ToastrService } from '../../service/toastr.service';




@Component({
  selector: 'app-create-ticket',
  imports: [DialogModule, CommonModule, SelectModule, FormsModule, InputTextModule, TextareaModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})
export class CreateTicketComponent {

  @Output() ticketCriado = new EventEmitter<void>();

  characters: any[] = [];
  formattedCharacters: any;
  selectedCharacter: any = null
  user: any;
  display: boolean = false;
  dadosTicket: FormGroup;

  categorias = [
    { name: '[🐛] Bugs' },
    { name: '[🛠️] Suporte geral' },
    { name: '[🚨] Denuncia' },
    { name: '[💡] Sugestões' },
  ];
  selectedCategoria: any;

  constructor(
    private auth: AuthService,
    private serverService: ServerService,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {
    this.dadosTicket = this.fb.group({
      motivo: ['', Validators.required],
      subject: ['', Validators.required],
      observation: ['', [Validators.required, Validators.minLength(50)]],
    });

    if (this.selectedCategoria?.name === '[🚨] Denuncia') {
      this.dadosTicket.addControl('idDenunciado', this.fb.control('', Validators.required));
      this.dadosTicket.addControl('url', this.fb.control('', Validators.required));
    }
    if (this.characters.length > 0) {
      this.dadosTicket.addControl('character', this.fb.control(this.selectedCharacter.id, Validators.required));
    }
  }

  ngOnInit(): void {
    this.user = this.auth.getUserFromToken()


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
  }


  selectCharacter(character: any) {
    this.selectedCharacter = character;
    console.log("Character selecionado:", this.selectedCharacter)
  }

  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  enviarTicket() {
    const dadosFormat = {
      userId: this.user.id,
      subject: this.dadosTicket.value.subject,
      motivo: this.dadosTicket.value.motivo.name,
      description: this.dadosTicket.value.observation,
      personagem: this.selectedCharacter,
      idDenunciado: this.dadosTicket.value.idDenunciado,
      url: this.dadosTicket.value.url,
    }
    console.log("Dados do ticket", dadosFormat)

    this.ticketService.createTicket(dadosFormat).subscribe({
      next: (res: any) => {
        console.log("Ticket criado com sucesso", res)
        this.dadosTicket.reset()
        this.selectedCharacter = null
        this.display = false
        this.toastr.showSucess("Ticket criado com sucesso, embreve entraremos em contato!")
        // window.location.reload()
        this.ticketCriado.emit(); 
      }
    })
  }

}
