import { Directory, File, Paths } from "expo-file-system";

export async function guardarImagenManga(
    imagenUri: string
): Promise<string> {

    const carpeta = new Directory(Paths.document, 'mangas');

    carpeta.create({ idempotent: true });

    const imagenOriginal = new File(imagenUri);

    const extension = Paths.extname(imagenUri) || '.jpg';

    const imagenGuardada = new File(
        carpeta,
        `manga-${Date.now()}${extension}`
    );

    await imagenOriginal.copy(imagenGuardada);
    
    return imagenGuardada.uri;
}