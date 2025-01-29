import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core'
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputOtp } from 'primeng/inputotp';

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
    InputOtp
  ],
  providers: [provideNgxMask(), provideNativeDateAdapter(), MessageService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent implements OnInit, AfterViewInit {

  @ViewChild('dataNascimento', { static: false, read: ElementRef }) datePicker!: ElementRef;

  user: any;

  registroForm: FormGroup;


  verifyCode: boolean = false;
  steam: boolean = false;

  dadosCadastro = {
    nome: '',
    dataNascimento: '',
    email: '',
    telefone: '(11) 10148-5485',
    indicacao: '',
    discordID: localStorage.getItem('discordID')
  }

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

  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder, private toastr: ToastrService, private authService: AuthService, private router: Router, private messageService: MessageService) {
    this.registroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      dataNascimento: ['', [
        Validators.required,
        this.idadeMinima(18)
      ]],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', [Validators.required, Validators.pattern(/^\+?\d{1,4}[-.\s]?(\d{1,4}[-.\s]?)?\d{1,14}$/)]],
      indicacao: ['', [Validators.required]],
      checkbox: [false, [Validators.requiredTrue]]
    });

  }

  ngOnInit(): void {
    Object.keys(this.registroForm.controls).forEach(key => {
      this.registroForm.get(key)?.valueChanges.subscribe(() => {
        this.registroForm.get(key)?.markAsTouched();
      });
    });

    this.user = this.authService.getUserFromToken()
    this.selectedCountry = this.countryList.find(c => c.code === 'BR'); // Garante que inicia com o Brasil
    this.onCountryChange({ value: this.selectedCountry }); // Atualiza os placeholders e prefixos

    console.log("País selecionado:", this.selectedCountry);
  }

  onTelefoneInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dadosCadastro.telefone = inputElement.value;
  }

  ngAfterViewInit(): void {
    const input = this.datePicker.nativeElement.querySelector('.p-inputtext');
    if (input) {
      const formControl = this.registroForm.get('dataNascimento');
      formControl?.statusChanges.subscribe(status => {
        if (status === 'VALID') {
          input.classList.add('check');
        } else {
          input.classList.remove('check')
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
        this.showError();
        return { menorIdade: true };
      }

      return null;
    };
  }

  cadastrar() {
    this.authService.cadastrar(this.dadosCadastro).subscribe(
      sucess => {
        console.log(this.dadosCadastro);
      },
      err => {
        alert("Erro ao cadastrar usuario.")
        console.error("Erro: ", err)
      }
    )
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Você precisa ter pelo menos 18 anos para se registrar' });
  }
}
