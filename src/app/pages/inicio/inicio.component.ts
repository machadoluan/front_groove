import { Component, ElementRef, ViewChild, OnInit, ChangeDetectionStrategy, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../service/auth.service';
import { CarouselModule } from 'primeng/carousel';
import { Item } from '../../types/models.type';
import { MatExpansionModule } from '@angular/material/expansion';
import { CarrinhoService } from '../../service/carrinho.service';
import { FilaComponent } from '../../components/fila/fila.component';
import { Dialog } from 'primeng/dialog';
import { ServerService } from '../../service/server.service';
import { MessageComponent } from "../../components/message/message.component";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-inicio',
  imports: [
    CommonModule,
    CarouselModule,
    MatExpansionModule,
    FilaComponent,
    Dialog,
    MessageComponent,
    RouterLink,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InicioComponent implements OnInit {
  readonly panelOpenState = signal(false);

  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef;
  @ViewChild('btnParar') btnParar!: ElementRef;
  @ViewChild('btnAudio') btnAudio!: ElementRef;
  @ViewChild('iconeSom') iconeSom!: ElementRef;
  @ViewChild('controleVolume') controleVolume!: ElementRef;
  @ViewChild('btnTelaCheia') btnTelaCheia!: ElementRef;
  @ViewChild('iconeFullScreen') iconeFullScreen!: ElementRef;

  videoPaused: boolean = true;
  videoMutado: boolean = true;
  dropDown: boolean = true;
  iconDrop: boolean = true;
  entrar: boolean = true;
  showCarrinho: boolean = false;
  user: any;
  mostrarFila: boolean = true
  dialogVisible: boolean = false;
  account: any;
  criouConta: boolean = false




  vipItem: Item[] = [
    { title: 'Passaporte VIP PRATA', description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 25, class: 'prata' },
    { title: 'Passaporte VIP OURO', description: "Seja o destaque na cidade com nosso pacote VIP. Domine o jogo e surpreenda a todos!", quantity: 1, price: 65, class: 'ouro' },
    { title: 'Passaporte VIP DIAMANTE', description: "Desfrute de privilégios especiais com nosso VIP. Conquiste a cidade com estilo e vantagens exclusivas!", quantity: 1, price: 125, class: 'diamante' },
    { title: 'Passaporte VIP esmeralda', description: "Desfrute de privilégios especiais com nosso VIP. Conquiste a cidade com estilo e vantagens exclusivas!", quantity: 1, price: 125, class: 'esmeralda' },
  ];

  dimaItem: Item[] = [
    { title: '1.000 Diamantes', description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 10, class: 'onek-dima' },
    { title: '4.000 Diamantes', description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 30, class: 'fourk-dima' },
    { title: '8.000 Diamantes', description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 55, class: 'eightk-dima' },
    { title: '16.000 Diamantes', description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 55, class: 'sixteen-dima' }
  ];

  carrinho: Item[] = []

  error: string = ''

  constructor(
    private router: Router,
    private auth: AuthService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
    private serverService: ServerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    const fila = localStorage.getItem('fila')

    if (fila) {
      this.mostrarFila = false
    } else {
      this.mostrarFila = true
    }


    // New Cadastro

    const newCadastro = sessionStorage.getItem('newRegister')

    if (newCadastro) {
      this.criouConta = true
    } else {
      this.criouConta = false
    }

    const token = localStorage.getItem('token')
    if (token) {
      this.entrar = false;
      this.user = this.auth.getUserFromToken()
    } else {
      this.entrar = true;
    }


    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'not_in_guild') {
        this.router.navigate(['/'])
        this.dialogVisible = true;
      }
    });

    if (this.user && this.user.discordId) {
      this.serverService.getAccount(this.user.discordId).subscribe(
        (res: any) => {
          this.account = res.length ? res[0] : null;
          console.log(this.account)
          this.cdr.detectChanges();
        },
        (err: any) => {
          console.error(err);
        }
      )
    }
  }


  getAvatar(userId: string, avatar: string) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
  }


  dropdown() {
    this.iconDrop = !this.iconDrop
    this.dropDown = !this.dropDown
  }

  pauseDespauseVideo(): void {
    console.log("Método pauseDespauseVideo() chamado");
    if (this.backgroundVideo && this.backgroundVideo.nativeElement) {
      if (this.videoPaused) {
        console.log("Vídeo pausado");
        this.backgroundVideo.nativeElement.pause();
      } else {
        console.log("Vídeo retomado");
        this.backgroundVideo.nativeElement.play();
      }
      this.videoPaused = !this.videoPaused;
    }
  }



  mutarDesmutar(): void {
    if (this.backgroundVideo && this.backgroundVideo.nativeElement) {
      this.backgroundVideo.nativeElement.muted = !this.backgroundVideo.nativeElement.muted; // Invertendo o estado de mudo
      this.videoMutado = this.backgroundVideo.nativeElement.muted; // Atualizando a variável de controle de estado de mudo
    }
  }

  ajustarVolume() {
    this.backgroundVideo.nativeElement.volume = this.controleVolume.nativeElement.value;
  }

  telaCheia() {
    if (this.backgroundVideo.nativeElement.requestFullscreen) {
      this.backgroundVideo.nativeElement.requestFullscreen();
    } else if (this.backgroundVideo.nativeElement.mozRequestFullScreen) { /* Firefox */
      this.backgroundVideo.nativeElement.mozRequestFullScreen();
    } else if (this.backgroundVideo.nativeElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      this.backgroundVideo.nativeElement.webkitRequestFullscreen();
    } else if (this.backgroundVideo.nativeElement.msRequestFullscreen) { /* IE/Edge */
      this.backgroundVideo.nativeElement.msRequestFullscreen();
    }
  }

  cart() {
    this.showCarrinho = !this.showCarrinho
  }

  addCart(item: Item): void {
    const itemIndex = this.carrinho.findIndex(cartItem =>
      cartItem.title === item.title
    )
    if (itemIndex > -1) {
      console.log('Ja tem um item no carrinho.')

    } else {
      this.carrinho.push({ ...item });

    }
    console.log("Item foi adicionado ao carrinho", item)
    console.log("Carrinho: ", this.carrinho)
    this.carrinhoService.addCart(item)

  }

  removeCart(item: Item) {
    this.carrinho = this.carrinho.filter(cartItem => cartItem.title !== item.title)
  }

  fecharFila() {
    this.mostrarFila = false;
    localStorage.setItem('fila', 'false')
  }
  newCadastro() {
    this.criouConta = false;
    sessionStorage.removeItem('newRegister');
  }

  entrarlink(): string{
    return `${environment.apiUrl}/auth/discord`
  }
}
