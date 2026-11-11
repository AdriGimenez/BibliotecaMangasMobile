import { create } from 'zustand';
import type { Manga } from '../types/Manga';
import { getMangas, saveMangas } from '../storage/mangaStorage';

type MangaStore = {
    mangas: Manga[];
    setMangas: (mangas: Manga[]) => void;
    addManga: (manga: Manga) => Promise<void>;
    deleteManga: (mangaId: string) => Promise<void>;
    updateManga: (manga: Manga) => Promise<void>;
    loadMangas: () => Promise<void>;
};

export const useMangaStore = create<MangaStore>()((set) => ({
    mangas: [],

    setMangas: (mangas) => set({ mangas }),

    addManga: async (manga) => {
        const mangasGuardados = await getMangas();

        const nuevaLista = [...mangasGuardados, manga];
        await saveMangas(nuevaLista);

        set({ mangas: nuevaLista });
    },

    deleteManga: async (mangaId) => {
        const mangasGuardados = await getMangas();
        
        const nuevaLista = mangasGuardados.filter(
            (manga) => manga.id !== mangaId
        );

        await saveMangas(nuevaLista);

        set({ mangas: nuevaLista });
    },

    updateManga: async (mangaActualizado) => {
        const mangasGuardados = await getMangas();

        const nuevaLista = mangasGuardados.map((manga) =>
            manga.id === mangaActualizado.id
                ? mangaActualizado 
                : manga
        );
        
        await saveMangas(nuevaLista);
        
        set({ mangas: nuevaLista });
    },

    loadMangas: async () => {
        const mangasGuardados = await getMangas();
    
        set({ mangas: mangasGuardados });
    }
}));