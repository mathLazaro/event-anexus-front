import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone',
    standalone: true
})
export class PhonePipe implements PipeTransform {
    /**
     * Formata um número de telefone para o padrão brasileiro (00) 00000-0000
     * @param value - String com números de telefone (pode conter caracteres não numéricos)
     * @param format - Formato de saída: 'BR' para (00) 00000-0000, 'INTERNATIONAL' para +55 (00) 00000-0000
     * @returns String formatada ou string original se inválida
     */
    transform(value: string | null | undefined, format: 'BR' | 'INTERNATIONAL' = 'BR'): string {
        if (!value) return '';

        // Remove todos os caracteres não numéricos
        const numbers = value.replace(/\D/g, '');

        // Valida se tem números suficientes
        if (numbers.length < 10) return value; // Retorna original se inválido

        // Extrai as partes do telefone
        let ddd = '';
        let firstPart = '';
        let secondPart = '';
        let countryCode = '';

        if (format === 'INTERNATIONAL') {
            // Formato internacional: +55 (00) 00000-0000
            if (numbers.length >= 12) {
                countryCode = numbers.slice(0, numbers.length - 11);
                ddd = numbers.slice(numbers.length - 11, numbers.length - 9);
                firstPart = numbers.slice(numbers.length - 9, numbers.length - 4);
                secondPart = numbers.slice(numbers.length - 4);
            } else if (numbers.length === 11) {
                // Número brasileiro com 11 dígitos (celular)
                ddd = numbers.slice(0, 2);
                firstPart = numbers.slice(2, 7);
                secondPart = numbers.slice(7);
                countryCode = '55';
            } else if (numbers.length === 10) {
                // Número brasileiro com 10 dígitos (fixo)
                ddd = numbers.slice(0, 2);
                firstPart = numbers.slice(2, 6);
                secondPart = numbers.slice(6);
                countryCode = '55';
            }

            return countryCode ? `+${countryCode} (${ddd}) ${firstPart}-${secondPart}` : value;
        }

        // Formato brasileiro padrão
        if (numbers.length === 11) {
            // Celular: (00) 00000-0000
            ddd = numbers.slice(0, 2);
            firstPart = numbers.slice(2, 7);
            secondPart = numbers.slice(7);
        } else if (numbers.length === 10) {
            // Fixo: (00) 0000-0000
            ddd = numbers.slice(0, 2);
            firstPart = numbers.slice(2, 6);
            secondPart = numbers.slice(6);
        } else if (numbers.length > 11) {
            // Número internacional ou com código de país
            // Remove código do país e formata como brasileiro
            const lastEleven = numbers.slice(-11);
            ddd = lastEleven.slice(0, 2);
            firstPart = lastEleven.slice(2, 7);
            secondPart = lastEleven.slice(7);
        }

        return `(${ddd}) ${firstPart}-${secondPart}`;
    }

    /**
     * Remove a formatação do telefone, retornando apenas os números
     * @param value - String formatada
     * @returns String apenas com números
     */
    static unformat(value: string): string {
        return value ? value.replace(/\D/g, '') : '';
    }

    /**
     * Valida se um telefone brasileiro é válido
     * @param value - String do telefone (pode estar formatado ou não)
     * @returns true se válido
     */
    static isValid(value: string): boolean {
        if (!value) return false;

        const numbers = value.replace(/\D/g, '');

        // Telefone brasileiro deve ter 10 (fixo) ou 11 (celular) dígitos
        // Ou mais se incluir código do país
        if (numbers.length < 10 || numbers.length > 15) return false;

        // Valida DDD (11 a 99)
        const lastDigits = numbers.slice(-11);
        const ddd = parseInt(lastDigits.slice(0, 2));
        if (ddd < 11 || ddd > 99) return false;

        return true;
    }

    /**
     * Retorna o padrão regex para validação de telefone brasileiro
     * @param formatted - Se true, retorna regex para formato (00) 00000-0000
     * @returns RegExp para validação
     */
    static getValidationPattern(formatted: boolean = true): RegExp {
        if (formatted) {
            // Aceita (00) 00000-0000 ou (00) 0000-0000
            return /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        } else {
            // Aceita 10 ou 11 dígitos (ou mais se incluir código de país)
            return /^\+?\d{10,15}$/;
        }
    }
}
