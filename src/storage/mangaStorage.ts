import { Manga } from "../types/Manga";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MANGA_KEY = 'mangas';

export async function saveMangas(mangas: Manga[]) {
    const mangasJson = JSON.stringify(mangas);

    await AsyncStorage.setItem(MANGA_KEY, mangasJson);
}

export async function getMangas() {
    const mangasJson = await AsyncStorage.getItem(MANGA_KEY);

    if (mangasJson === null) {
        return [];
    }

    return JSON.parse(mangasJson) as Manga[];
}