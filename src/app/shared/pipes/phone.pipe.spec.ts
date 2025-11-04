import { PhonePipe } from './phone.pipe';

describe('PhonePipe', () => {
    let pipe: PhonePipe;

    beforeEach(() => {
        pipe = new PhonePipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    describe('transform', () => {
        it('should format 11-digit cellphone number', () => {
            expect(pipe.transform('11987654321')).toBe('(11) 98765-4321');
        });

        it('should format 10-digit landline number', () => {
            expect(pipe.transform('1133334444')).toBe('(11) 3333-4444');
        });

        it('should format already partially formatted number', () => {
            expect(pipe.transform('(11) 98765-4321')).toBe('(11) 98765-4321');
        });

        it('should format number with country code', () => {
            expect(pipe.transform('5511987654321', 'INTERNATIONAL')).toBe('+55 (11) 98765-4321');
        });

        it('should return empty string for null or undefined', () => {
            expect(pipe.transform(null)).toBe('');
            expect(pipe.transform(undefined)).toBe('');
        });

        it('should return original value for invalid numbers (less than 10 digits)', () => {
            expect(pipe.transform('123456789')).toBe('123456789');
        });
    });

    describe('unformat', () => {
        it('should remove all non-numeric characters', () => {
            expect(PhonePipe.unformat('(11) 98765-4321')).toBe('11987654321');
            expect(PhonePipe.unformat('+55 (11) 98765-4321')).toBe('5511987654321');
        });
    });

    describe('isValid', () => {
        it('should validate correct Brazilian phone numbers', () => {
            expect(PhonePipe.isValid('11987654321')).toBe(true);
            expect(PhonePipe.isValid('(11) 98765-4321')).toBe(true);
            expect(PhonePipe.isValid('1133334444')).toBe(true);
        });

        it('should invalidate incorrect phone numbers', () => {
            expect(PhonePipe.isValid('123')).toBe(false);
            expect(PhonePipe.isValid('')).toBe(false);
            expect(PhonePipe.isValid('00987654321')).toBe(false); // DDD inválido
        });
    });

    describe('getValidationPattern', () => {
        it('should return regex for formatted phone', () => {
            const pattern = PhonePipe.getValidationPattern(true);
            expect(pattern.test('(11) 98765-4321')).toBe(true);
            expect(pattern.test('(11) 3333-4444')).toBe(true);
            expect(pattern.test('11987654321')).toBe(false);
        });

        it('should return regex for unformatted phone', () => {
            const pattern = PhonePipe.getValidationPattern(false);
            expect(pattern.test('11987654321')).toBe(true);
            expect(pattern.test('+5511987654321')).toBe(true);
            expect(pattern.test('(11) 98765-4321')).toBe(false);
        });
    });
});
