import moment from 'moment';
import 'moment/locale/pt-br';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

moment.locale('pt-br');

export function formatDate(date: Date, format: string): string {
  return moment(date).format(format);
}

export function format_cpf(document: string): string {
  return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function format_cnpj(document: string): string {
  return document.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  );
}

export function format_phone(phone_number: string): string {
  const phone = parsePhoneNumberFromString(phone_number, 'BR');

  if (phone) return phone.format('NATIONAL');

  return '';
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function sanitizeValue(value: string): string {
  return value.replace(/\.|-|\/|\(|\)|\s/g, '');
}
