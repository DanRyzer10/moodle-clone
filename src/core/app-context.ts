import { AuthService } from "../services/auth/auth.service";

export class AppContext {
    private static instance: AppContext;
    private static _authService:AuthService = new AuthService();

    public static get authService():AuthService{
        return AppContext._authService;
    }
    private constructor() {
    }

    public static getInstance(): AppContext {
        if (!AppContext.instance) {
            AppContext.instance = new AppContext();
        }
        return AppContext.instance;
    }

}