import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
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

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective, MatCheckboxModule, ButtonModule, Select, DatePicker, ToastModule],
  providers: [provideNgxMask(), provideNativeDateAdapter(), MessageService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent implements OnInit {

  user: any;

  registroForm: FormGroup;

  dadosCadastro = {
    nome: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    indicacao: '',
    discordID: localStorage.getItem('discordID')
  }

  indicacoes = [
    { label: 'Amigos', value: 'amigos' },
    { label: 'Discord', value: 'Discord' },
    { label: 'YouTube', value: 'youtube' },
    { label: 'TikTok', value: 'TikTok' },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'Outros', value: 'outros' },
  ];



  constructor(private fb: FormBuilder, private toastr: ToastrService, private authService: AuthService, private router: Router, private messageService: MessageService) {
    this.registroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      dataNascimento: ['', [
        Validators.required,
        this.idadeMinima(18)
      ]],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', [Validators.required, Validators.pattern(/^(\d{11,12})$/)]],
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
