import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appPhoneMask]',
    standalone: true
})
export class PhoneMaskDirective {
    @Input() appPhoneMask: 'BR' | 'INTERNATIONAL' = 'BR';

    constructor(
        private el: ElementRef,
        private control: NgControl
    ) { }

    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, '');

        // Limita o tamanho máximo
        const maxLength = this.appPhoneMask === 'INTERNATIONAL' ? 15 : 11;
        if (value.length > maxLength) {
            value = value.slice(0, maxLength);
        }

        // Formata o valor
        const formatted = this.formatPhone(value);

        // Atualiza o input e o FormControl
        if (this.control && this.control.control) {
            this.control.control.setValue(formatted, { emitEvent: false });
        }

        input.value = formatted;
    }

    @HostListener('blur')
    onBlur(): void {
        // Marca o campo como touched quando perde o foco
        if (this.control && this.control.control) {
            this.control.control.markAsTouched();
        }
    }

    private formatPhone(numbers: string): string {
        if (!numbers) return '';

        if (this.appPhoneMask === 'INTERNATIONAL') {
            // Formato internacional
            if (numbers.length >= 12) {
                const country = numbers.slice(0, numbers.length - 11);
                const ddd = numbers.slice(numbers.length - 11, numbers.length - 9);
                const first = numbers.slice(numbers.length - 9, numbers.length - 4);
                const second = numbers.slice(numbers.length - 4);
                return `+${country} (${ddd}) ${first}-${second}`;
            } else if (numbers.length === 11) {
                return this.formatBrazilian(numbers, true);
            }
            return numbers;
        }

        // Formato brasileiro padrão
        return this.formatBrazilian(numbers);
    }

    private formatBrazilian(numbers: string, addCountryCode: boolean = false): string {
        const prefix = addCountryCode ? '+55 ' : '';

        if (numbers.length <= 2) {
            return prefix + (numbers.length > 0 ? `(${numbers}` : '');
        } else if (numbers.length <= 6) {
            return prefix + `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
        } else if (numbers.length <= 10) {
            // Fixo: (00) 0000-0000
            return prefix + `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
        } else {
            // Celular: (00) 00000-0000
            return prefix + `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
        }
    }
}
