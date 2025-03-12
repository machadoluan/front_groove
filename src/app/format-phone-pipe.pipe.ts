import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone',
  standalone: true
})
export class FormatPhonePipe implements PipeTransform {
  transform(phoneNumber: string, countryCode: string): string {
    if (!phoneNumber || !countryCode) {
      return phoneNumber;
    }

    // Mapeia códigos de país para seus respectivos tamanhos
    const countryCodeLengths: { [key: string]: number } = {
      'BR': 2, // +55
      'US': 1, // +1
      'AR': 2, // +54
      'DE': 2, // +49
      'FR': 2, // +33
      'IN': 2, // +91
      'IT': 2, // +39
      'JP': 2, // +81
      'MX': 2, // +52
      'GB': 2, // +44
      'RU': 1, // +7
      'CN': 2, // +86
      'CA': 1, // +1
      'AU': 2, // +61
      'ES': 2, // +34
      'PT': 3, // +351
      'ZA': 2, // +27
      'KR': 2, // +82
      'NG': 3, // +234
    };

    // Obtém o tamanho do código do país
    const countryCodeLength = countryCodeLengths[countryCode] || 0;

    // Extrai o código do país (ex: +55, +1, +351)
    const countryCodePrefix = phoneNumber.startsWith('+') ? phoneNumber.slice(0, countryCodeLength + 1) : '';
    const numberWithoutCountryCode = phoneNumber.startsWith('+') ? phoneNumber.slice(countryCodeLength + 1) : phoneNumber;

    const phonePlaceholders: { [key: string]: string } = {
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

    const placeholder = phonePlaceholders[countryCode];
    if (!placeholder) {
      return phoneNumber;
    }

    let formattedPhone = '';
    let phoneIndex = 0;

    // Formata o número sem o código do país
    for (let i = 0; i < placeholder.length; i++) {
      if (placeholder[i] === '0' || placeholder[i] === '9') {
        if (phoneIndex < numberWithoutCountryCode.length) {
          formattedPhone += numberWithoutCountryCode[phoneIndex];
          phoneIndex++;
        } else {
          formattedPhone += placeholder[i];
        }
      } else {
        formattedPhone += placeholder[i];
      }
    }

    // Adiciona o código do país de volta ao número formatado
    return countryCodePrefix + ' ' + formattedPhone;
  }
}