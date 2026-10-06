import AsyncStorage from "@react-native-async-storage/async-storage";

import type { User } from '../types/User';

const USER_KEY = 'registeredUser';
const SESSION_KEY = 'userSession';

export async function saveUser(user: User) {
    const userJson = JSON.stringify(user);

    await AsyncStorage.setItem(USER_KEY, userJson);
}

export async function getUser(): Promise<User | null> {
    const userJson = await AsyncStorage.getItem(USER_KEY);

    if (userJson === null){
        return null;
    }

    return JSON.parse(userJson) as User;
}

export async function saveSession(email: string) {
    await AsyncStorage.setItem(SESSION_KEY, email);
}

export async function getSession(): Promise<string | null> {
    return await AsyncStorage.getItem(SESSION_KEY);
}

export async function clearSession() {
    await AsyncStorage.removeItem(SESSION_KEY);
}