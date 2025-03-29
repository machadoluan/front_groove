import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AllowAprovadComponent } from "../../components/allow-aprovad/allow-aprovad.component";
import { AllowReprovadComponent } from "../../components/allow-reprovad/allow-reprovad.component";
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ServerService } from '../../service/server.service';
import { ToastrService } from '../../service/toastr.service';

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


  quiz: boolean = false

  allowReprovad = false;
  allowAprovad = false

  allQuestions = [
    {
      question: "O que significa RP dentro do contexto de FiveM?",
      options: ["Roleplay", "Rápido e Preciso", "Registro Policial", "Realidade Paralela"],
      correctAnswer: "Roleplay"
    },
    {
      question: "O que um jogador deve fazer antes de agir em uma situação hostil?",
      options: ["Evitar qualquer tipo de conflito", "Verificar se há um motivo válido dentro do RP", "Usar hacks para se defender", "Atirar primeiro e perguntar depois"],
      correctAnswer: "Verificar se há um motivo válido dentro do RP"
    },
    {
      question: "O que significa 'Metagaming' no RP?",
      options: ["Criar uma história para o personagem", "Usar informações obtidas fora do jogo para benefício dentro do RP", "Usar apenas armas permitidas pelo servidor", "Juntar um grupo grande de jogadores"],
      correctAnswer: "Usar informações obtidas fora do jogo para benefício dentro do RP"
    },
    {
      question: "O que caracteriza 'Powergaming'?",
      options: ["Simular ações realistas sem forçar situações", "Criar estratégias para vencer disputas de RP", "Forçar ações impossíveis ou irreais sem chance de reação para os outros jogadores", "Utilizar comandos dentro das regras do servidor"],
      correctAnswer: "Forçar ações impossíveis ou irreais sem chance de reação para os outros jogadores"
    },
    {
      question: "Como deve ser tratado um assalto dentro do RP?",
      options: ["Roubando e matando a vítima para evitar testemunhas", "Sempre usando a arma mais cara para intimidar", "Criando um contexto, exigindo um mínimo de diálogo e evitando ações irreais", "Pegando tudo o mais rápido possível e fugindo"],
      correctAnswer: "Criando um contexto, exigindo um mínimo de diálogo e evitando ações irreais"
    },
    {
      question: "O que é 'Combat Logging'?",
      options: ["Usar um sistema de logs para revisar batalhas", "Sair do jogo propositalmente para evitar consequências no RP", "Reportar um jogador que quebrou as regras", "Utilizar estratégias para vencer um combate"],
      correctAnswer: "Sair do jogo propositalmente para evitar consequências no RP"
    },
    {
      question: "O que um jogador deve fazer se for morto em um confronto?",
      options: ["Criar uma nova identidade e caçar quem o matou", "Retornar ao local e buscar vingança", "Reportar o jogador que venceu o confronto", "Aceitar a morte e esquecer informações ligadas ao evento"],
      correctAnswer: "Aceitar a morte e esquecer informações ligadas ao evento"
    },
    {
      question: "O que significa 'Fail RP'?",
      options: ["Criar um personagem que seja engraçado", "Errar comandos no chat", "Atuar de maneira que fuja da lógica realista do roleplay", "Jogar de forma leal dentro do RP"],
      correctAnswer: "Atuar de maneira que fuja da lógica realista do roleplay"
    },
    {
      question: "Qual dessas ações é um exemplo de 'VDM' (Vehicle Deathmatch)?",
      options: ["Atropelar outro jogador intencionalmente sem motivo dentro do RP", "Abandonar um veículo em um local proibido", "Comprar um carro modificado para fazer corridas", "Correr com o carro em alta velocidade na cidade"],
      correctAnswer: "Atropelar outro jogador intencionalmente sem motivo dentro do RP"
    },
    {
      question: "Como um jogador deve agir ao ser abordado por um policial no RP?",
      options: ["Fugir em qualquer situação sem reagir", "Parar e seguir a abordagem conforme o contexto do RP", "Atirar antes que o policial fale algo", "Sair do jogo para evitar ser preso"],
      correctAnswer: "Parar e seguir a abordagem conforme o contexto do RP"
    },
    {
      question: "O que caracteriza 'RDM' (Random Deathmatch)?",
      options: ["Matar outro jogador sem motivo válido dentro do RP", "Criar um conflito bem fundamentado no roleplay", "Usar armas de fogo durante um combate controlado", "Defender-se de uma ameaça justificada"],
      correctAnswer: "Matar outro jogador sem motivo válido dentro do RP"
    },
    {
      question: "O que é um personagem de 'hardcore RP'?",
      options: ["Quem joga sem respeitar as regras para 'se divertir mais'", "Qualquer pessoa que tenha nível alto no servidor", "Um jogador que só aceita combates violentos", "Alguém que busca o máximo de realismo e coerência em suas ações"],
      correctAnswer: "Alguém que busca o máximo de realismo e coerência em suas ações"
    },
    {
      question: "Qual é a melhor maneira de criar um personagem interessante para RP?",
      options: ["Criar uma história de fundo coerente e interagir de forma imersiva", "Fazer um personagem invencível para dominar o servidor", "Copiar um personagem famoso de filme ou série", "Fazer um personagem que não interage com ninguém"],
      correctAnswer: "Criar uma história de fundo coerente e interagir de forma imersiva"
    },
    {
      question: "Como um jogador pode denunciar uma infração no servidor?",
      options: ["Espalhando mensagens no chat global", "Gravando a situação e reportando via meio oficial do servidor", "Chamando outros jogadores para se vingar", "Mandando mensagens ofensivas para o infrator"],
      correctAnswer: "Gravando a situação e reportando via meio oficial do servidor"
    },
    {
      question: "O que é um 'Safe Zone' dentro do RP?",
      options: ["Uma área onde combates e crimes são proibidos", "Uma zona onde só iniciantes podem jogar", "Um esconderijo dentro do mapa", "Um local onde só criminosos podem agir"],
      correctAnswer: "Uma área onde combates e crimes são proibidos"
    },
    {
      question: "Qual dessas situações representa um bom Roleplay?",
      options: ["Usar conhecimento da vida real para justificar ações no jogo", "Ficar mudo durante as interações para evitar problemas", "Agir de acordo com a história do seu personagem e interagir de forma realista", "Criar um personagem apenas para provocar os outros jogadores"],
      correctAnswer: "Agir de acordo com a história do seu personagem e interagir de forma realista"
    },
    {
      question: "O que significa Fear RP?",
      options: ["Interpretar o medo do personagem em situações de risco", "Fugir de qualquer confronto sem motivo", "Criar um personagem que nunca sente medo", "Usar armas para evitar qualquer tipo de medo"],
      correctAnswer: "Interpretar o medo do personagem em situações de risco"
    },
    {
      question: "Quando um jogador pode atirar em outra pessoa dentro do RP?",
      options: ["Sempre que tiver uma arma", "Quando estiver sozinho no servidor", "Somente após criar uma interação coerente e justificar o ataque no RP", "Assim que ver alguém armado"],
      correctAnswer: "Somente após criar uma interação coerente e justificar o ataque no RP"
    },
    {
      question: "O que caracteriza um personagem de Qualidade no RP?",
      options: ["Ele nunca interage com outros personagens", "Ele tem as melhores armas e equipamentos", "Ele respeita o desenvolvimento de sua história e reage de forma coerente ao ambiente", "Ele sempre vence todas as situações"],
      correctAnswer: "Ele respeita o desenvolvimento de sua história e reage de forma coerente ao ambiente"
    },
    {
      question: "O que fazer se um jogador quebrar as regras?",
      options: ["Sair do servidor imediatamente", "Reportar a situação com provas para a administração do servidor", "Cometer o mesmo erro para revidar", "Resolver no chat com insultos"],
      correctAnswer: "Reportar a situação com provas para a administração do servidor"
    },
    {
      question: "Qual é o significado de 'New Life Rule' (NLR)?",
      options: ["Renomear o personagem depois de um tempo no servidor", "Criar um novo personagem ao morrer", "Voltar ao local onde morreu para se vingar", "O jogador não pode lembrar de eventos passados após morrer"],
      correctAnswer: "O jogador não pode lembrar de eventos passados após morrer"
    },
    {
      question: "Qual dessas atitudes quebra o RP?",
      options: ["Falar com outros personagens respeitando sua história e contexto", "Participar de um evento e seguir suas regras", "Trabalhar dentro de um emprego no RP", "Pedir informações pelo chat global sobre um evento in-game"],
      correctAnswer: "Pedir informações pelo chat global sobre um evento in-game"
    },
    {
      question: "O que fazer ao encontrar um bug que pode ser explorado?",
      options: ["Aproveitar o bug ao máximo antes que seja corrigido", "Ignorar e continuar jogando normalmente", "Compartilhar o bug com amigos para que também aproveitem", "Gravar e reportar o bug para a administração"],
      correctAnswer: "Gravar e reportar o bug para a administração"
    },
    {
      question: "Qual a melhor definição para 'IC' (In Character)?",
      options: ["Quando um jogador faz algo fora das regras", "Quando o jogador age com base no personagem e não como ele mesmo", "Quando um jogador conta a sua história fora do RP", "Quando um jogador está sem personagem"],
      correctAnswer: "Quando o jogador age com base no personagem e não como ele mesmo"
    },
    {
      question: "Qual é a diferença entre 'IC' e 'OOC' (Out of Character)?",
      options: ["IC é quando o jogador atua como seu personagem e OOC é quando o jogador age como ele mesmo", "IC é uma regra obrigatória e OOC é uma opção", "IC é para jogos de ação e OOC para jogos de estratégia", "IC é para personagens fictícios e OOC é para jogadores reais"],
      correctAnswer: "IC é quando o jogador atua como seu personagem e OOC é quando o jogador age como ele mesmo"
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
    private toastrService: ToastrService
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
      this.toastrService.showError("Por favor, selecione uma resposta antes de avançar.")
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

  avancar() {
    this.quiz = true
  }
}
