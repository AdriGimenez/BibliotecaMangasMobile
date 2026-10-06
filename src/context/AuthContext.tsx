import { createContext, useContext, useEffect, useState } from "react";
import { clearSession, getSession, getUser, saveSession, saveUser } from "../storage/authStorage";

import type { ReactNode } from 'react';
import type { User } from '../types/User';

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    register: (user: User) => Promise<void>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            const sessionEmail = await getSession();
            const savedUser = await getUser();

            if (
                sessionEmail !== null &&
                savedUser !== null &&
                savedUser.email === sessionEmail
            ) {
                setUser(savedUser);
                setIsAuthenticated(true);
            }

            setIsLoading(false);
        };

        loadSession();
    }, []);

    const register = async (newUser: User) => {
        await saveUser(newUser);
    };

    const login = async (
        email: string,
        password: string
    ): Promise<boolean> => {
        const savedUser = await getUser();
    
        if (
            savedUser !== null &&
            savedUser.email === email &&
            savedUser.password === password
        ) {
            await saveSession(savedUser.email);

            setUser(savedUser);
            setIsAuthenticated(true);

            return(true);
        }

        return false;
    };

    const logout = async () => {
        await clearSession();

        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth debe utilizarse dentro de AuthProvider');
    }

    return context;
}