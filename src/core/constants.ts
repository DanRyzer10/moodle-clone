export const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000';
export const IMAGE_URL = `${BACKEND_URL}/public/moodleclonenobg.png`
export const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
export const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
export const SCHEMA = process.env.EXPO_PUBLIC_SCHEMA || 'moodlecloneapp';
export const AUTH_STORAGE_KEY = process.env.EXPO_PUBLIC_AUTH_STORAGE_KEY || 'auth_session_data';