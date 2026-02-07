import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService, AuthResponse } from '../services/auth/auth.service';

// --- TU CLASE ORIGINAL (SINGLETON) ---
export class AppContext {
    private static instance: AppContext;
    private static _authService: AuthService = new AuthService();

    public static get authService(): AuthService {
        return AppContext._authService;
    }

    private constructor() {}

    public static getInstance(): AppContext {
        if (!AppContext.instance) {
            AppContext.instance = new AppContext();
        }
        return AppContext.instance;
    }
}

// --- INTEGRACIÓN CON REACT (ESTADO DINÁMICO) ---

interface AuthContextType {
    user: AuthResponse | null;
    setUser: (user: AuthResponse | null) => void;
    isLoading: boolean;
}

//contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Al cargar, verificamos si hay una sesión guardada en SecureStore
        const loadStoredData = async () => {
            try {
                const data = await AppContext.authService.getStoredAuthData();
                if (data) {
                    setUser(data);
                }
            } catch (error) {
                console.error('Error cargando datos de sesión:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadStoredData();
    }, []);

    return React.createElement(
        AuthContext.Provider,
        { value: { user, setUser, isLoading } },
        children
    );
}

// Hook para consumir el contexto en tus pantallas (como el Dashboard)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};