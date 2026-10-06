export function validateMangaInput(
    titulo: string,
    tomo: string,
    editorial: string
): string[] {
    const errors: string[] = [];

    if(!titulo.trim()) {
        errors.push('El título es requerido');
    }

    if(!tomo.trim()) {
        errors.push('El tomo es requerido')
    } else if (Number(tomo) <= 0) {
        errors.push('El tomo debe ser mayor a 0');
    }

    if (!editorial.trim()) {
        errors.push('La editorial es requerida');
    }

    return errors;
}