import * as WebBrowser from 'expo-web-browser';
import { AuthSessionResult,makeRedirectUri} from 'expo-auth-session';
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_WEB_CLIENT_ID, SCHEMA } from '../../core/constants';

WebBrowser.maybeCompleteAuthSession();

type PromptAsyncFn = () => Promise<AuthSessionResult | null>;

export class AuthService {
    async handleGoogleLogin () {
        try {
            const result = await WebBrowser.openAuthSessionAsync()
        }
    }
  
}