import { Component, ElementRef, ViewChild, OnInit, ChangeDetectionStrategy, signal, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, mapToResolve, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CarouselModule } from 'primeng/carousel';
import { gallery, Item } from '../../types/models.type';
import { MatExpansionModule } from '@angular/material/expansion';
import { CarrinhoService } from '../../service/carrinho.service';
import { FilaComponent } from '../../components/fila/fila.component';
import { Dialog } from 'primeng/dialog';
import { ServerService } from '../../service/server.service';
import { MessageComponent } from "../../components/message/message.component";
import { environment } from '../../../environments/environment';
import { PanelModule } from 'primeng/panel';
import { TermsComponent } from "../../components/terms/terms.component";
import { LogService } from '../../service/log.service';
import { GalleriaModule } from 'primeng/galleria';

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
    PanelModule,
    GalleriaModule
  ],
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InicioComponent implements OnInit, AfterViewInit {
  readonly panelOpenState = signal(false);

  vipDetalis: boolean = false

  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef;
  @ViewChild('btnParar') btnParar!: ElementRef;
  @ViewChild('btnAudio') btnAudio!: ElementRef;
  @ViewChild('iconeSom') iconeSom!: ElementRef;
  @ViewChild('controleVolume') controleVolume!: ElementRef;
  @ViewChild('btnTelaCheia') btnTelaCheia!: ElementRef;
  @ViewChild('iconeFullScreen') iconeFullScreen!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

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
  criouConta: boolean = false;
  errorJogue: boolean = false;
  allowList: boolean | null = null;
  vipSelecionado: any;
  activeIndex: number = 0;     

  images: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ]

  vipItem: any[] = [
    {
      title: 'Grove Beginner',
      photo: "/img/VIP_PRATA.png",
      dateValidade: "30 Dias",
      description: "Ideal para quem quer começar bem e com estilo de rua",
      quantity: 1,
      price: 25,
      class: 'prata',
      detalis: [
        "Spray personalizado com a tag da Grove (item de inventário)",
        "Acesso a tatuagens e cortes de cabelo dos OGs",
        "Acesso a roupas urbanas exclusivas (moletom, boné, camisa dos anos 90)",
        "Baú do carro aumentado em +20kg",
        "Salário simbólico de R$1.000/2 horas",
        "Mochila com +10kg de capacidade",
        "Acesso ao GROOVE STORE (Loja de itens Groove)",
        "Caixa surpresa: Envelope do Ryder",
        "Prioridade leve na fila (nível 20)",
        "Tag “Iniciante da Grove” no Discord"
      ]
    },
    {
      title: 'Veterano da Grove',
      photo: "/img/VIP_OURO.png",
      dateValidade: "30 Dias",
      description: "Pra quem cresceu no bairro e conhece o corre",
      quantity: 1,
      price: 75,
      class: 'ouro',
      detalis: [
        "Spray personalizado com a tag da Grove (item de inventário)",
        "Acesso a roupas urbanas exclusivas (moletom, boné, camisa dos anos 90)",
        "Acesso a tatuagens e cortes de cabelo dos OGs",
        "Estilo de andar exclusivo 'swagger anos 90'",
        "Salário de R$5.000/2 horas",
        "Desconto de 5% em todas lojas da Groove",
        "+30kg de mochila / +1 slot de garagem",
        "+10% de EXP em profissões ilegais",
        "+1 slot no guarda-roupa",
        "Caixa surpresa: Bolsa do CJ",
        "Tag “Veterano Grove” no Discord",
        "Prioridade média na fila (nível 50)"
      ]
    },
    {
      title: 'OG da Grove',
      photo: "/img/VIP_DIAMANTE.png",
      dateValidade: "30 Dias",
      description: "Agora você dita as regras no bairro",
      quantity: 1,
      price: 150,
      class: 'diamante',
      detalis: [
        "3x Spray personalizado com a tag da Grove (item de inventário)",
        "Acesso a tatuagens e cortes de cabelo dos OGs",
        "Acesso a roupas urbanas exclusivas (moletom, boné, camisa dos anos 90)",
        "+100kg de baú (Residência em seu nome) / +3 slots de garagem - 30 dias",
        "+20% de EXP geral em profissões (RP balanceado)",
        "Bônus de contrato em missões ilegais (+10% do valor do contrato)",
        "Imunidade a perda de itens na água",
        "Chance de encontrar “memórias da infância” (itens que ativam falas ou áudios do CJ)",
        "Caixa surpresa: Pacote do Smoke",
        "Desconto de 10% em lojas e IPVA",
        "Prioridade alta na fila (nível 80)",
        "Tag “OG Grove” no Discord"
      ]
    },
    {
      title: 'Lenda da Grove',
      photo: "/img/VIP_ESMERALDA.png",
      dateValidade: "30 Dias",
      description: "Você virou parte da história. Agora é você quem escreve o futuro.",
      quantity: 1,
      price: 220,
      class: 'esmeralda',
      detalis: [
        "3x Spray personalizado com a tag da Grove (item de inventário)",
        "Acesso a tatuagens e cortes de cabelo dos OGs",
        "Acesso a roupas urbanas exclusivas (moletom, boné, camisa dos anos 90)",
        "+100kg de baú (Residência em seu nome) / +3 slots de garagem - 30 dias",
        "+20% de EXP geral em profissões (RP balanceado)",
        "Bônus de contrato em missões ilegais (+10% do valor do contrato)",
        "Imunidade a perda de itens na água",
        "Caixa surpresa: Pacote do Smoke",
        "Desconto de 15% em lojas e IPVA",
        "Mansão VIP (Se disponível) - 30 dias",
        "1x item Skin de arma à escolha",
        "2x XP em missões de painel",
        "Caixa surpresa: Caixa do Tenpenny",
        "Efeito sonoro único ao logar: frase icônica do GTA SA",
        "Prioridade máxima (fila zero)"
      ]
    }
  ];


  dimaItem: Item[] = [
    { title: '6.000 Diamantes', photo: "/img/pacote_dima_1.png", dateValidade: "", description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 15, class: 'onek-dima' },
    { title: '10.000 Diamantes', photo: "/img/pacote_dima_2.png", dateValidade: "", description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 25, class: 'fourk-dima' },
    { title: '22.000 Diamantes', photo: "/img/pacote_dima_3.png", dateValidade: "", description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 50, class: 'eightk-dima' },
    { title: '108.000 Diamantes', photo: "img/pacote_dima_4.png", dateValidade: "", description: "Eleve sua experiência com nosso pacote VIP exclusivo. Destaque-se e conquiste a cidade!", quantity: 1, price: 240, class: 'sixteen-dima' }
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
    private cdr: ChangeDetectorRef,
    private log: LogService,
  ) { }



  ngAfterViewInit() {

  }



  ngOnInit(): void {
    this.images = [
      {
        itemImageSrc: 'https://rollingstone.com.br/media/uploads/2023/12/gta-6-jogo-game-rockstar-foto-divulgacao.jpg',
        thumbnailImageSrc: 'https://rollingstone.com.br/media/uploads/2023/12/gta-6-jogo-game-rockstar-foto-divulgacao.jpg',
        alt: 'Descrição para Imagem 1',
        title: 'Inserção de blips de garagem similares aos do GTA San Andreas.'
      },
      {
        itemImageSrc: 'https://cdn.motor1.com/images/mgl/QeKLQ8/s3/gta-vi-new-trailer.jpg',
        thumbnailImageSrc: 'https://cdn.motor1.com/images/mgl/QeKLQ8/s3/gta-vi-new-trailer.jpg',
        alt: 'Descrição para Imagem 2',
        title: 'Título 2'
      },
      
      // … outras imagens …
    ];


    const fila = localStorage.getItem('token')
    // this.dialogVisible = true;

    if (fila) {
      this.mostrarFila = false;
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
        this.mostrarFila = false;
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
          this.cdr.detectChanges();
        },
        (err: any) => {
          console.error(err);
        }
      )
    }

    if (this.user) {
      this.serverService.verifyAllowList(this.user.license).subscribe({
        next: (res: any) => {
          console.log("Valor recebido do backend:", res);
          this.allowList = res;
          console.log("allowList atualizado para:", this.allowList);
          this.cdr.detectChanges(); // Força o Angular a atualizar a UI
        },
        error: (err) => {
          console.error("Erro ao buscar AllowList:", err);
        }
      });
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




  fecharFila() {
    this.mostrarFila = false;
    localStorage.setItem('fila', 'false')
  }
  newCadastro() {
    this.criouConta = false;
    sessionStorage.removeItem('newRegister');
  }

  entrarlink() {
    this.log.log('clique_lista_espera').subscribe()

    window.location.href = `${environment.apiUrl}/auth/discord`;
  }

  fazerAllowlist() {
    this.log.log('fazer_allowlist').subscribe()
  }


  seeMore(item: Item) {
    this.vipSelecionado = item;
    this.vipDetalis = true
  }
}