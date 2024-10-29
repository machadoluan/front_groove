import { Component, ElementRef, ViewChild, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';
import { AuthService } from '../../service/auth.service';
import { CarouselModule } from 'primeng/carousel';
import { Item } from '../../types/itens.type';
import { findIndex } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarrinhoService } from '../../service/carrinho.service';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    HeaderComponent,
    MatExpansionModule,
    FooterComponent
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
  vipItem: Item[] = [
    { title: 'Passaporte VIP PRATA', description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 25, class: 'prata' },
    { title: 'Passaporte VIP OURO', description: "Seja o destaque na cidade com nosso pacote VIP. Domine o jogo e surpreenda a todos!", quantity: 1, price: 65, class: 'ouro' },
    { title: 'Passaporte VIP DIAMANTE', description: "Desfrute de privilégios especiais com nosso VIP. Conquiste a cidade com estilo e vantagens exclusivas!", quantity: 1, price: 125, class: 'diamante' }
  ];

  dimaItem: Item[] = [
    { title: '1.000 Diamantes', description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 10, class: 'onek-dima' },
    { title: '4.000 Diamantes', description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 30, class: 'fourk-dima' },
    { title: '8.000 Diamantes', description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 55, class: 'eightk-dima' }
  ];

  carrinho: Item[] = []

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('Token')
    if (token) {
      this.entrar = false;
    } else {
      this.entrar = true;
    }

    this.user = this.auth.getUserFromToken()
  }


  getAvatar(userId: string, avatar: string) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
  }


  login() {
    this.dialog.open(LoginComponent)
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

  comprarVip() {

  }
}
