import { Component, ElementRef, ViewChild, OnInit, ChangeDetectionStrategy, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { PanelModule } from 'primeng/panel';

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
    PanelModule
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

  questions = [
    { title: '1. O que devo fazer assim que entrar na Groove Roleplay para uma experiência incrível?', content: 'Assim que entrar na cidade, aproveite para explorar os pontos turísticos restaurados, como a Grove Street, a Ponte de San Fierro. Faça conexões com outros cidadãos, descubra os locais movimentados e defina o seu caminho: você prefere a vida honesta, como policial, mecânico ou médico, ou quer seguir pelas ruas do crime? Sua escolha inicial determinará sua trajetória nos primeiros 30 dias' },
    { title: '2. Como posso me envolver na comunidade da cidade e participar de eventos e atividades?', content: 'A melhor forma de se conectar é frequentando os locais mais movimentados, como a Grove Street, hospitais e oficinas mecânicas. Além disso, fique atento aos anúncios da cidade sobre corridas, torneios de luta e desafios ilegais ou policiais. A comunidade é viva e sempre há algo acontecendo, basta estar no lugar certo e na hora certa.' },
    { title: '3. Qual é a melhor maneira de ganhar dinheiro e construir uma carreira dentro da cidade?', content: 'Tudo depende do caminho que você escolheu! Se seguiu o lado legal, há trabalhos como mecânico, médico ou policial. Se preferiu o lado ilegal, o lucro pode vir de assaltos, contrabando e até mesmo da dominação de territórios. Independente da escolha, planeje bem seus passos e crie alianças, pois cada decisão pode abrir (ou fechar) portas no futuro.' },
    { title: '4. O que devo fazer se encontrar problemas técnicos ou precisar de suporte enquanto estiver na cidade?', content: 'Se enfrentar problemas técnicos ou precisar de suporte, a melhor opção é acessar nosso site oficial e abrir um ticket de atendimento na opção “Suporte”. Nossa equipe de suporte está sempre pronta para ajudar com questões de conexão, regras do servidor e outros problemas que possam surgir.' },
    { title: '5. Existe alguma vantagem em explorar a cidade ao invés de apenas seguir missões?', content: 'Sim! Explorar a cidade pode revelar segredos, itens raros e até mesmo oportunidades inesperadas. Alguns pontos turísticos escondem histórias, enquanto becos e vielas podem ser a chave para encontrar contatos importantes no submundo do crime. Quem explora, sempre tem vantagem.' },
    { title: '6. Como funcionam as mudanças de caminho após os primeiros 30 dias na cidade?', content: 'A cada 30 dias, você poderá decidir se quer continuar no mesmo estilo de vida ou mudar completamente. Para isso, será necessário passar por um processo de transição: um policial que quer virar criminoso, por exemplo, pode precisar fingir sua morte ou ser expulso da corporação. Já um criminoso que quer se tornar policial pode ter que provar seu valor para conseguir uma nova chance. Essa transição torna o roleplay mais realista e desafiador. Cada estilo trás benefícios diferentes, continuar o mesmo estilo pode aumentar sua sorte no caminho que já estava traçando. :)' }
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
    const fila = localStorage.getItem('token')

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
    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'access_denied') {
        this.router.navigate(['/'])
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

  entrarlink() {
    window.location.href = `${environment.apiUrl}/auth/discord`;
  }
}