export type Manga = {
    id: string;
    titulo: string;
    tomo: number;
    editorial: string;
    comprado: boolean;
    imagenUri?: string;
    ubicacion?: {
        latitud: number;
        longitud: number;
    };
    contactoNombre?: string;
}