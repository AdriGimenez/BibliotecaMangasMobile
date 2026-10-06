import { validateMangaInput } from '../validators';

describe('validateMangaInput', () => {
    it('no devuelve errores cuando los datos son válidos', () => {
        const errors = validateMangaInput(
            'Maid-sama',
            '1',
            'Ivrea'
        );

        expect(errors).toEqual([]);
    });

    it('devuelve error cuando falta el título', () => {
        const errors = validateMangaInput(
            '',
            '1',
            'Ivrea'
        );

        expect(errors).toContain('El título es requerido');
    });

    it('devuelve error cuando el tomo es menor o igual a 0', () => {
        const errors = validateMangaInput(
            'Maid-sama',
            '0',
            'Ivrea'
        );

        expect(errors).toContain(
            'El tomo debe ser mayor a 0'
        );
    });
});