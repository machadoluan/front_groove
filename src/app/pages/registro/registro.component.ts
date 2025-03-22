import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core'
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputOtp } from 'primeng/inputotp';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InputMaskModule } from 'primeng/inputmask';
import { environment } from '../../../environments/environment';
import { FormatPhonePipe } from '../../format-phone-pipe.pipe';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective,
    MatCheckboxModule,
    ButtonModule,
    Select,
    DatePicker,
    ToastModule,
    FormsModule,
    InputOtp,
    InputMaskModule,
  ],
  providers: [provideNgxMask(), provideNativeDateAdapter(), MessageService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent implements OnInit, AfterViewInit {

  @ViewChild('dataNascimento', { static: false, read: ElementRef }) datePicker!: ElementRef;

  user: any;

  registroForm: FormGroup;
  temporaryFormData: any;

  verifyCode: boolean = false;
  steam: boolean = false;
  codigoBackend: string = ''
  codigo: string = '';
  steamVinculado: boolean = false;
  sendingCode: boolean = false;


  countryList = [
    { label: 'Brazil', name: 'BR', dialCode: '+55', code: 'BR', placeholder: ' (00) 9 9999-9999' },
    { label: 'United States', name: 'US', dialCode: '+1', code: 'US', placeholder: ' (000) 000-0000' },
    { label: 'Argentina', name: 'AR', dialCode: '+54', code: 'AR', placeholder: ' (00) 15 9999-9999' },
    { label: 'Germany', name: 'DE', dialCode: '+49', code: 'DE', placeholder: ' (000) 000-0000' },
    { label: 'France', name: 'FR', dialCode: '+33', code: 'FR', placeholder: ' 00 00 00 00 00' },
    { label: 'India', name: 'IN', dialCode: '+91', code: 'IN', placeholder: ' 00000-00000' },
    { label: 'Italy', name: 'IT', dialCode: '+39', code: 'IT', placeholder: ' 000 000 0000' },
    { label: 'Japan', name: 'JP', dialCode: '+81', code: 'JP', placeholder: ' 00-0000-0000' },
    { label: 'Mexico', name: 'MX', dialCode: '+52', code: 'MX', placeholder: ' 00 00 00 00 00' },
    { label: 'United Kingdom', name: 'GB', dialCode: '+44', code: 'GB', placeholder: ' 00000 000000' },
    { label: 'Russia', name: 'RU', dialCode: '+7', code: 'RU', placeholder: ' (000) 000-00-00' },
    { label: 'China', name: 'CN', dialCode: '+86', code: 'CN', placeholder: ' 000 0000 0000' },
    { label: 'Canada', name: 'CA', dialCode: '+1', code: 'CA', placeholder: ' (000) 000-0000' },
    { label: 'Australia', name: 'AU', dialCode: '+61', code: 'AU', placeholder: ' 0000 000 000' },
    { label: 'Spain', name: 'ES', dialCode: '+34', code: 'ES', placeholder: ' 000 00 00 00' },
    { label: 'Portugal', name: 'PT', dialCode: '+351', code: 'PT', placeholder: ' 000 000 000' },
    { label: 'South Africa', name: 'ZA', dialCode: '+27', code: 'ZA', placeholder: ' 000 000 0000' },
    { label: 'South Korea', name: 'KR', dialCode: '+82', code: 'KR', placeholder: ' 000-0000-0000' },
    { label: 'Nigeria', name: 'NG', dialCode: '+234', code: 'NG', placeholder: ' 000 000 0000' }
  ];


  selectedCountry: any;
  phonePrefix: string = '+55';  // Prefixo do telefone
  phonePlaceholder: string = '(000) 000-0000';  // Placeholder padrão

  phonePlaceholders: { [key: string]: string } = {
    'BR': '(00) 9 9999-9999',
    'US': '(000) 000-0000',
    'AR': '(00) 15 9999-9999',
    'DE': '(000) 000-0000',
    'FR': '00 00 00 00 00', // França
    'IN': '00000-00000', // Índia
    'IT': '000 000 0000', // Itália
    'JP': '00-0000-0000', // Japão
    'MX': '00 00 00 00 00', // México
    'GB': '00000 000000', // Reino Unido
    'RU': '(000) 000-00-00', // Rússia
    'CN': '000 0000 0000', // China
    'CA': '(000) 000-0000', // Canadá
    'AU': '0000 000 000', // Austrália
    'ES': '000 00 00 00', // Espanha
    'PT': '000 000 000', // Portugal
    'ZA': '000 000 0000', // África do Sul
    'KR': '000-0000-0000', // Coreia do Sul
    'NG': '000 000 0000', // Nigéria
  };


  indicacoes = [
    { label: 'Amigos', value: 'amigos' },
    { label: 'Discord', value: 'Discord' },
    { label: 'YouTube', value: 'youtube' },
    { label: 'TikTok', value: 'TikTok' },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'Outros', value: 'outros' },
  ];



  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.registroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      dataNascimento: ['', [
        Validators.required,
        this.idadeMinima(18)
      ]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\+?\d{1,4}[-.\s]?(\d{1,4}[-.\s]?)?\d{1,14}$/)]],
      indicacao: ['', [Validators.required]],
      checkbox: [false, [Validators.requiredTrue]],
      discordId: '',
      license: ''
    });

  }


  ngOnInit(): void {
    this.user = this.authService.getUserFromToken();
    this.selectedCountry = this.countryList.find(c => c.code === 'BR');
    this.onCountryChange({ value: this.selectedCountry });


    const dadosSalvos = this.cookieService.get('registroForm');

    if (dadosSalvos) {
      this.registroForm.patchValue(JSON.parse(dadosSalvos));
      this.steam = true;
    }

    console.log("País selecionado:", this.selectedCountry);
    const dados = sessionStorage.getItem('registroForm');
    if (dados) {
      console.log(JSON.parse(dados));
    }

    // Verificar se o token está presente na query string
    this.route.queryParams.subscribe(params => {
      const token = params['tokend'];
      const steamToken = params['tokenS'];

      if (!token && !steamToken) {
        // Se não houver token, redirecionar para a página inicial
        this.router.navigate(['/']);
      }

      if (token) {
        const tokenPayload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(tokenPayload));
        this.registroForm.patchValue({ discordId: decodedPayload.discordId });
      }

      if (steamToken) {
        const tokenPayload = steamToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(tokenPayload));
        this.steam = true;
        this.steamVinculado = true;
        this.registroForm.patchValue({ license: decodedPayload.steamHex });
      }
    });
  }


  ngAfterViewInit(): void {
    const dateInput = document.getElementById('dataNascimentoInput') as HTMLInputElement;

    if (dateInput) {
      dateInput.addEventListener('input', (e) => {
        let value = dateInput.value.replace(/\D/g, ''); // Remove tudo que não for número

        if (value.length > 2) value = value.replace(/^(\d{2})(\d)/, '$1/$2');
        if (value.length > 5) value = value.replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');

        dateInput.value = value.substring(0, 10);
      });

      const formControl = this.registroForm.get('dataNascimento');
      formControl?.statusChanges.subscribe(status => {
        if (status === 'VALID') {
          dateInput.classList.add('check');
        } else {
          dateInput.classList.remove('check')
        }
      })
    }
  }

  onCountryChange(event: any) {
    const country = event.value;
    this.selectedCountry = country;
    this.phonePrefix = country.dialCode;
    this.phonePlaceholder = this.getPhonePlaceholder(country.code);

    this.cdRef.detectChanges(); // Força a atualização da view
  }



  getPhonePlaceholder(countryCode: string): string {
    return this.phonePlaceholders[countryCode] || '(00) 9 99-9999'; // Padrão caso não esteja na lista
  }

  private idadeMinima(idade: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: true };
      }

      const dataNascimento = new Date(control.value);

      // Verifica se é uma data válida
      if (dataNascimento.toString() === 'Invalid Date') {
        return { invalidDate: true };
      }

      const hoje = new Date();
      const diffAnos = hoje.getFullYear() - dataNascimento.getFullYear();

      const mesmoMes = hoje.getMonth() === dataNascimento.getMonth();
      const mesAnterior = hoje.getMonth() < dataNascimento.getMonth();
      const mesmoDia = hoje.getDate() >= dataNascimento.getDate();

      const idadeReal = mesAnterior ? diffAnos - 1 : (mesmoMes && !mesmoDia ? diffAnos - 1 : diffAnos);

      if (idadeReal < idade) {
        this.showError('Você precisa ter pelo menos 18 anos para se registrar');
        return { menorIdade: true };
      }

      return null;
    };
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showSucess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: message })
  }





  // SMS
  // sendCode() {
  //   const telefoneCompleto = `${this.phonePrefix}${this.registroForm.value.telefone}`;
  //   this.registroForm.patchValue({ telefone: telefoneCompleto })

  //   console.log(this.registroForm.value)

  //   this.authService.verifyCode(this.registroForm.value.telefone).subscribe(
  //     (res) => {
  //       console.log('Resposta do backend:', res.codigo);
  //       this.verifyCode = true;
  //       this.codigoBackend = res.codigo
  //     },

  //     (error) => {
  //       console.error(error)
  //     }
  //   )
  // }

  sendCode() {
    this.sendingCode = true
    this.authService.verifyCode(this.registroForm.value.email, this.registroForm.value.nome).subscribe({
      next: (res) => {
        this.verifyCode = true;
        this.codigoBackend = res.codigo
      },
      error: (error) => {
        console.error(error)
        this.sendingCode = false
      },
      complete: () => {
        this.sendingCode = false
      }
    })
  }



  verificarCode() {
    if (this.codigo === this.codigoBackend) {
      this.verifyCode = false
      const dadosCadastro = JSON.stringify(this.registroForm.value)
      this.cookieService.set('registroForm', dadosCadastro, 1, '/')
      this.steam = true
    } else {
      this.showError('Código Invalido!')
    }
  }

  vincularSteam() {
    window.location.href = `${environment.apiUrl}/auth/steam`;
  }

  concluirCadastro() {
    console.log(this.registroForm.value)
    this.authService.cadastrar(this.registroForm.value).subscribe({
      next: (response: any) => {
        if (response.sucess) {
          this.cookieService.delete('registroForm', '/');

          localStorage.setItem('token', response.token);

          sessionStorage.setItem('newRegister', response.token);


          this.router.navigate(['/']);
        }
      },
      error: (error: HttpErrorResponse) => {
        // Captura a mensagem do erro vindo do backend
        const errorMessage = error.error?.message || 'Ocorreu um erro desconhecido!';
        console.error(errorMessage);
        this.showError(errorMessage)
      }
    }
    );
  }

  changeNumber() {
    this.verifyCode = false
    this.registroForm.get('email')?.reset();
  }

  validateNumericInput(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, ''); // Remove tudo que não for número
  }
}
