import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ServerService } from '../../service/server.service';
import { AuthService } from '../../service/auth.service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';




@Component({
  selector: 'app-create-ticket',
  imports: [DialogModule, CommonModule, SelectModule, FormsModule, InputTextModule, TextareaModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})
export class CreateTicketComponent {

  constructor(
    private auth: AuthService,
    private serverService: ServerService
  ) {

  }

  characters: any[] = [];
  formattedCharacters: any;
  selectedCharacter: any = null
  user: any;
  display: boolean = false;



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


}
