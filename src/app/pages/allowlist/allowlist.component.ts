import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AllowAprovadComponent } from "../../components/allow-aprovad/allow-aprovad.component";
import { AllowReprovadComponent } from "../../components/allow-reprovad/allow-reprovad.component";
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ServerService } from '../../service/server.service';

@Component({
  selector: 'app-allowlist',
  imports: [
    CommonModule,
    AllowAprovadComponent,
    AllowReprovadComponent
  ],
  templateUrl: './allowlist.component.html',
  styleUrl: './allowlist.component.scss'
})
export class AllowlistComponent implements OnInit {


  quiz: boolean = true

  allowReprovad = false;
  allowAprovad = false

  allQuestions = [
    {
      question: "O que significa RP dentro do contexto de FiveM?",
      options: ["A) Realidade Paralela", "B) Rápido e Preciso", "C) Roleplay", "D) Registro Policial"],
      correctAnswer: "C) Roleplay"
    },
    {
      question: "O que um jogador deve fazer antes de agir em uma situação hostil?",
      options: ["A) Atirar primeiro e perguntar depois", "B) Verificar se há um motivo válido dentro do RP", "C) Usar hacks para se defender", "D) Evitar qualquer tipo de conflito"],
      correctAnswer: "B) Verificar se há um motivo válido dentro do RP"
    },
    {
      question: "O que significa 'Metagaming' no RP?",
      options: ["A) Usar informações obtidas fora do jogo para benefício dentro do RP", "B) Criar uma história para o personagem", "C) Juntar um grupo grande de jogadores", "D) Usar apenas armas permitidas pelo servidor"],
      correctAnswer: "A) Usar informações obtidas fora do jogo para benefício dentro do RP"
    },
    {
      question: "O que caracteriza 'Powergaming'?",
      options: ["A) Simular ações realistas sem forçar situações", "B) Forçar ações impossíveis ou irreais sem chance de reação para os outros jogadores", "C) Utilizar comandos dentro das regras do servidor", "D) Criar estratégias para vencer disputas de RP"],
      correctAnswer: "B) Forçar ações impossíveis ou irreais sem chance de reação para os outros jogadores"
    },
    {
      question: "Como deve ser tratado um assalto dentro do RP?",
      options: ["A) Roubando e matando a vítima para evitar testemunhas", "B) Criando um contexto, exigindo um mínimo de diálogo e evitando ações irreais", "C) Pegando tudo o mais rápido possível e fugindo", "D) Sempre usando a arma mais cara para intimidar"],
      correctAnswer: "B) Criando um contexto, exigindo um mínimo de diálogo e evitando ações irreais"
    },
    {
      question: "O que é 'Combat Logging'?",
      options: ["A) Sair do jogo propositalmente para evitar consequências no RP", "B) Utilizar estratégias para vencer um combate", "C) Usar um sistema de logs para revisar batalhas", "D) Reportar um jogador que quebrou as regras"],
      correctAnswer: "A) Sair do jogo propositalmente para evitar consequências no RP"
    },
    {
      question: "O que um jogador deve fazer se for morto em um confronto?",
      options: ["A) Retornar ao local e buscar vingança", "B) Aceitar a morte e esquecer informações ligadas ao evento", "C) Criar uma nova identidade e caçar quem o matou", "D) Reportar o jogador que venceu o confronto"],
      correctAnswer: "B) Aceitar a morte e esquecer informações ligadas ao evento"
    },
    {
      question: "O que significa 'Fail RP'?",
      options: ["A) Atuar de maneira que fuja da lógica realista do roleplay", "B) Errar comandos no chat", "C) Jogar de forma leal dentro do RP", "D) Criar um personagem que seja engraçado"],
      correctAnswer: "A) Atuar de maneira que fuja da lógica realista do roleplay"
    },
    {
      question: "Qual dessas ações é um exemplo de 'VDM' (Vehicle Deathmatch)?",
      options: ["A) Atropelar outro jogador intencionalmente sem motivo dentro do RP", "B) Correr com o carro em alta velocidade na cidade", "C) Comprar um carro modificado para fazer corridas", "D) Abandonar um veículo em um local proibido"],
      correctAnswer: "A) Atropelar outro jogador intencionalmente sem motivo dentro do RP"
    },
    {
      question: "Como um jogador deve agir ao ser abordado por um policial no RP?",
      options: ["A) Parar e seguir a abordagem conforme o contexto do RP", "B) Sair do jogo para evitar ser preso", "C) Atirar antes que o policial fale algo", "D) Fugir em qualquer situação sem reagir"],
      correctAnswer: "A) Parar e seguir a abordagem conforme o contexto do RP"
    },
    {
      question: "O que caracteriza 'RDM' (Random Deathmatch)?",
      options: ["A) Matar outro jogador sem motivo válido dentro do RP", "B) Criar um conflito bem fundamentado no roleplay", "C) Defender-se de uma ameaça justificada", "D) Usar armas de fogo durante um combate controlado"],
      correctAnswer: "A) Matar outro jogador sem motivo válido dentro do RP"
    },
    {
      question: "O que é um personagem de 'hardcore RP'?",
      options: ["A) Alguém que busca o máximo de realismo e coerência em suas ações", "B) Um jogador que só aceita combates violentos", "C) Qualquer pessoa que tenha nível alto no servidor", "D) Quem joga sem respeitar as regras para 'se divertir mais'"],
      correctAnswer: "A) Alguém que busca o máximo de realismo e coerência em suas ações"
    },
    {
      question: "Qual é a melhor maneira de criar um personagem interessante para RP?",
      options: ["A) Criar uma história de fundo coerente e interagir de forma imersiva", "B) Fazer um personagem invencível para dominar o servidor", "C) Copiar um personagem famoso de filme ou série", "D) Fazer um personagem que não interage com ninguém"],
      correctAnswer: "A) Criar uma história de fundo coerente e interagir de forma imersiva"
    },
    {
      question: "Como um jogador pode denunciar uma infração no servidor?",
      options: ["A) Gravando a situação e reportando via meio oficial do servidor", "B) Chamando outros jogadores para se vingar", "C) Espalhando mensagens no chat global", "D) Mandando mensagens ofensivas para o infrator"],
      correctAnswer: "A) Gravando a situação e reportando via meio oficial do servidor"
    },
    {
      question: "O que é um 'Safe Zone' dentro do RP?",
      options: ["A) Uma área onde combates e crimes são proibidos", "B) Um local onde só criminosos podem agir", "C) Um esconderijo dentro do mapa", "D) Uma zona onde só iniciantes podem jogar"],
      correctAnswer: "A) Uma área onde combates e crimes são proibidos"
    },
    {
      question: "Qual dessas situações representa um bom Roleplay?",
      options: ["A) Usar conhecimento da vida real para justificar ações no jogo", "B) Agir de acordo com a história do seu personagem e interagir de forma realista", "C) Ficar mudo durante as interações para evitar problemas", "D) Criar um personagem apenas para provocar os outros jogadores"],
      correctAnswer: "B) Agir de acordo com a história do seu personagem e interagir de forma realista"
    },
    {
      question: "O que significa Fear RP?",
      options: ["A) Interpretar o medo do personagem em situações de risco", "B) Fugir de qualquer confronto sem motivo", "C) Criar um personagem que nunca sente medo", "D) Usar armas para evitar qualquer tipo de medo"],
      correctAnswer: "A) Interpretar o medo do personagem em situações de risco"
    },
    {
      question: "Quando um jogador pode atirar em outra pessoa dentro do RP?",
      options: ["A) Sempre que tiver uma arma", "B) Somente após criar uma interação coerente e justificar o ataque no RP", "C) Quando estiver sozinho no servidor", "D) Assim que ver alguém armado"],
      correctAnswer: "B) Somente após criar uma interação coerente e justificar o ataque no RP"
    },
    {
      question: "O que caracteriza um personagem de Qualidade no RP?",
      options: ["A) Ele sempre vence todas as situações", "B) Ele respeita o desenvolvimento de sua história e reage de forma coerente ao ambiente", "C) Ele tem as melhores armas e equipamentos", "D) Ele nunca interage com outros personagens"],
      correctAnswer: "B) Ele respeita o desenvolvimento de sua história e reage de forma coerente ao ambiente"
    },
    {
      question: "O que fazer se um jogador quebrar as regras?",
      options: ["A) Cometer o mesmo erro para revidar", "B) Reportar a situação com provas para a administração do servidor", "C) Resolver no chat com insultos", "D) Sair do servidor imediatamente"],
      correctAnswer: "B) Reportar a situação com provas para a administração do servidor"
    },
    {
      question: "Qual é o significado de 'New Life Rule' (NLR)?",
      options: ["A) O jogador não pode lembrar de eventos passados após morrer", "B) Criar um novo personagem ao morrer", "C) Renomear o personagem depois de um tempo no servidor", "D) Voltar ao local onde morreu para se vingar"],
      correctAnswer: "A) O jogador não pode lembrar de eventos passados após morrer"
    },
    {
      question: "Qual dessas atitudes quebra o RP?",
      options: ["A) Pedir informações pelo chat global sobre um evento in-game", "B) Falar com outros personagens respeitando sua história e contexto", "C) Participar de um evento e seguir suas regras", "D) Trabalhar dentro de um emprego no RP"],
      correctAnswer: "A) Pedir informações pelo chat global sobre um evento in-game"
    },
    {
      question: "O que fazer ao encontrar um bug que pode ser explorado?",
      options: ["A) Aproveitar o bug ao máximo antes que seja corrigido", "B) Gravar e reportar o bug para a administração", "C) Compartilhar o bug com amigos para que também aproveitem", "D) Ignorar e continuar jogando normalmente"],
      correctAnswer: "B) Gravar e reportar o bug para a administração"
    },
    {
      question: "Qual a melhor definição para 'IC' (In Character)?",
      options: ["A) Tudo o que acontece dentro do jogo, respeitando a história do personagem", "B) Situações externas que influenciam no RP", "C) Conversas no Discord sobre eventos do servidor", "D) Quando um jogador faz algo fora das regras"],
      correctAnswer: "A) Tudo o que acontece dentro do jogo, respeitando a história do personagem"
    },
    {
      question: "O que é um 'hitman' dentro do RP?",
      options: ["A) Um jogador que mata qualquer um sem motivo", "B) Um assassino de aluguel que age de acordo com o RP e com planejamento", "C) Um policial infiltrado", "D) Um jogador que usa hacks para matar"],
      correctAnswer: "B) Um assassino de aluguel que age de acordo com o RP e com planejamento"
    },
    {
      question: "Como um jogador pode agir ao ser sequestrado no RP?",
      options: ["A) Cooperar e reagir de maneira coerente com o RP", "B) Sair do jogo para evitar o sequestro", "C) Chamar amigos pelo Discord para resgatá-lo", "D) Começar a correr sem motivo para escapar"],
      correctAnswer: "A) Cooperar e reagir de maneira coerente com o RP"
    },
    {
      question: "O que é o termo 'Cop Baiting'?",
      options: ["A) Provocar a polícia sem motivo válido para forçar uma interação", "B) Criar um RP interessante com policiais", "C) Fazer denúncias contra outros jogadores", "D) Agir como policial sem ser um"],
      correctAnswer: "A) Provocar a polícia sem motivo válido para forçar uma interação"
    },
    {
      question: "Quando um jogador pode usar o chat OOC (Out of Character)?",
      options: ["A) Para resolver problemas técnicos ou questões administrativas", "B) Para discutir sobre eventos do jogo dentro do RP", "C) Para pedir dinheiro para outros jogadores", "D) Para enganar jogadores durante negociações"],
      correctAnswer: "A) Para resolver problemas técnicos ou questões administrativas"
    },
    {
      question: "O que significa 'Whitelisted Job'?",
      options: ["A) Um trabalho no servidor que exige aprovação ou teste para ser realizado", "B) Um emprego onde o jogador pode fazer o que quiser", "C) Qualquer trabalho dentro do RP", "D) Trabalhos que envolvem apenas criminosos"],
      correctAnswer: "A) Um trabalho no servidor que exige aprovação ou teste para ser realizado"
    },
    {
      question: "Quando um jogador pode reviver outro no RP?",
      options: ["A) Apenas quando for um paramédico seguindo as regras do servidor", "B) Sempre que tiver um amigo ferido", "C) Quando possui dinheiro suficiente", "D) Quando a vítima pede"],
      correctAnswer: "A) Apenas quando for um paramédico seguindo as regras do servidor"
    },
    {
      question: "O que acontece se um jogador desrespeitar o RP várias vezes?",
      options: ["A) Ele será banido ou receberá punições da administração", "B) Nada, ele pode continuar jogando normalmente", "C) Ele pode criar um novo personagem e recomeçar", "D) Ele perderá apenas seu dinheiro in-game"],
      correctAnswer: "A) Ele será banido ou receberá punições da administração"
    },
    {
      question: "O que é o termo 'Economia Balanceada' dentro do RP?",
      options: ["A) Um sistema onde o dinheiro e os itens têm valor realista e coerente com o RP", "B) Quando os jogadores podem ter dinheiro infinito", "C) Um mercado onde apenas os administradores controlam tudo", "D) Quando todos os jogadores começam com o mesmo valor em dinheiro"],
      correctAnswer: "A) Um sistema onde o dinheiro e os itens têm valor realista e coerente com o RP"
    },
    {
      question: "Como um jogador deve agir ao ser preso no RP?",
      options: ["A) Aceitar a prisão e seguir o processo judicial conforme o RP", "B) Sair do jogo para evitar a cadeia", "C) Criar outro personagem e tentar fugir", "D) Xingar os policiais pelo chat"],
      correctAnswer: "A) Aceitar a prisão e seguir o processo judicial conforme o RP"
    },
    {
      question: "O que é um 'Heist' no RP?",
      options: ["A) Um assalto planejado e organizado dentro das regras do servidor", "B) Um crime cometido aleatoriamente", "C) Uma compra ilegal de veículos", "D) Uma luta entre gangues"],
      correctAnswer: "A) Um assalto planejado e organizado dentro das regras do servidor"
    },
    {
      question: "Qual é o papel dos paramédicos dentro do RP?",
      options: ["A) Prestar socorro dentro das regras médicas do servidor", "B) Reviver qualquer um sem justificativa", "C) Trabalhar apenas para jogadores VIP", "D) Apenas dirigir ambulâncias"],
      correctAnswer: "A) Prestar socorro dentro das regras médicas do servidor"
    },
    {
      question: "O que acontece se um jogador desrespeitar um administrador?",
      options: ["A) Ele pode ser punido com advertência ou banimento", "B) Ele pode ser promovido a moderador", "C) Nada acontece, pois administradores não interferem no jogo", "D) Ele pode se vingar dentro do RP"],
      correctAnswer: "A) Ele pode ser punido com advertência ou banimento"
    },
    {
      question: "Qual a importância de um bom Roleplay?",
      options: ["A) Criar experiências imersivas e realistas para todos os jogadores", "B) Tornar-se o jogador mais rico do servidor", "C) Ser o mais poderoso e ter as melhores armas", "D) Ignorar as regras para se divertir mais"],
      correctAnswer: "A) Criar experiências imersivas e realistas para todos os jogadores"
    },
    {
      question: "O que um jogador deve evitar ao criar seu personagem?",
      options: ["A) Fazer um personagem com história coerente", "B) Copiar nomes de celebridades ou com referências criminosas e criar personagens sem profundidade", "C) Seguir as regras e respeitar o RP", "D) Criar uma profissão e interagir com os outros"],
      correctAnswer: "B) Copiar nomes de celebridades ou com referências criminosas e criar personagens sem profundidade"
    },
    {
      question: "O que um jogador pode fazer se se sentir injustiçado no RP?",
      options: ["A) Reportar para a administração do servidor", "B) Usar hacks para se vingar", "C) Sair do jogo e nunca mais voltar", "D) Criar outro personagem para atacar quem o prejudicou"],
      correctAnswer: "A) Reportar para a administração do servidor"
    },
    {
      question: "O que é um 'Gang RP'?",
      options: ["A) Um roleplay focado em organizações criminosas dentro das regras do servidor", "B) Qualquer grupo de amigos que jogam juntos", "C) Uma forma de cometer crimes sem punição", "D) Um modo onde só existem tiroteios"],
      correctAnswer: "A) Um roleplay focado em organizações criminosas dentro das regras do servidor"
    }
  ];



  questions: any[] = [];
  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  userAnswers: string[] = []; // Armazena as respostas do usuário
  quizFinished = false;
  user: any;


  constructor(
    private router: Router,
    private auth: AuthService,
    private serverService: ServerService,
  ) {
    this.selectRandomQuestions();
  }

  ngOnInit(): void {
    this.user = this.auth.getUserFromToken()
  }

  // Seleciona 15 questões aleatórias
  selectRandomQuestions() {
    const shuffled = this.allQuestions.sort(() => 0.5 - Math.random());
    this.questions = shuffled.slice(0, 15);
    this.userAnswers = new Array(this.questions.length).fill(null); // Inicializa o array de respostas
  }

  // Seleciona uma resposta
  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.userAnswers[this.currentQuestionIndex] = answer; // Armazena a resposta do usuário
  }

  // Avança para a próxima questão ou finaliza o quiz
  nextQuestion() {
    if (this.selectedAnswer !== null) {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = this.userAnswers[this.currentQuestionIndex]; // Carrega a resposta já selecionada (se houver)
      } else {
        if (this.score < 12) {
          this.allowReprovad = true
        } else {
          this.allowAprovad = true
          this.serverService.releaseAllowList(this.user.discordId).subscribe(
            (res) => {
              console.log(res)
            },
            (err) => {
              console.error(err)
            }
          )
        }
      }
    } else {
      alert("Por favor, selecione uma resposta antes de avançar.");
    }
  }

  // Calcula a pontuação
  get score() {
    return this.questions.reduce((acc, question, index) => {
      return acc + (this.userAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  }

  concluir() {
    this.router.navigate(['/'])
  }

}
