import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import { BACKEND_URL, SCHEMA, AUTH_STORAGE_KEY } from '../../core/constants';

WebBrowser.maybeCompleteAuthSession();

export interface AuthResponse {
    token: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    picture?: string;
    [key: string]: unknown;
}

export class AuthService {
    private readonly authEndpoint = `${BACKEND_URL}/api/v1/oauth/google`;
    private readonly redirectUri = `${SCHEMA}://auth/callback`;

    async handleGoogleLogin(): Promise<AuthResponse | null> {
        try {
            const authUrl = `${this.authEndpoint}?redirect_uri=${encodeURIComponent(this.redirectUri)}`;

            const result = await WebBrowser.openAuthSessionAsync(
                authUrl,
                this.redirectUri
            );

            if (result.type === 'success' && result.url) {
                const authData = this.parseAuthDataFromUrl(result.url);

                if (authData) {
                    await this.saveAuthData(authData);
                    return authData;
                }
            }

            if (result.type === 'cancel') {
                console.log('Authentication cancelled by user');
            }

            return null;
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    }

    private parseAuthDataFromUrl(url: string): AuthResponse | null {
        try {
            const urlObj = new URL(url);
            const params = urlObj.searchParams;

            const token = params.get('token');
            if (!token) {
                console.error('No token found in callback URL');
                return null;
            }

            return {
                token,
                firstname: params.get('firstname') ?? undefined,
                lastname: params.get('lastname') ?? undefined,
                email: params.get('email') ?? undefined,
                picture: params.get('picture') ?? undefined,
            };
        } catch (error) {
            console.error('Error parsing auth data from URL:', error);
            return null;
        }
    }

    private async saveAuthData(data: AuthResponse): Promise<void> {
        try {
            const jsonData = JSON.stringify(data);
            await SecureStore.setItemAsync(AUTH_STORAGE_KEY, jsonData);
        } catch (error) {
            console.error('Error saving auth data to secure storage:', error);
            throw error;
        }
    }

    async getStoredAuthData(): Promise<AuthResponse | null> {
        try {
            const jsonData = await SecureStore.getItemAsync(AUTH_STORAGE_KEY);
            if (jsonData) {
                return JSON.parse(jsonData) as AuthResponse;
            }
            return null;
        } catch (error) {
            console.error('Error retrieving auth data from secure storage:', error);
            return null;
        }
    }

    async clearAuthData(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(AUTH_STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing auth data from secure storage:', error);
            throw error;
        }
    }

    async isAuthenticated(): Promise<boolean> {
        const authData = await this.getStoredAuthData();
        return authData !== null && !!authData.token;
    }
}
