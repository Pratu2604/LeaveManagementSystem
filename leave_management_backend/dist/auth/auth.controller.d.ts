import { Request } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(req: any): void;
    googleAuthRedirect(req: any, res: any): Promise<any>;
    user(request: Request): Promise<{
        msg: string;
    }>;
    refreshToken(req: any, res: any): Promise<{
        accessToken: string;
    }>;
}
