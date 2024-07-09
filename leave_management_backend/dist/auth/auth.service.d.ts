import { JwtService } from '@nestjs/jwt';
import { UserCredentials } from './entities/UserCredentials.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { Employee } from 'src/employee/entities/Employee.entity';
import { UserOtp } from './entities/userOtp.entity';
import { UserDetails } from './utils/types';
export declare class AuthService {
    private jwtService;
    private readonly userCredentialsRepository;
    private readonly employeeRepository;
    private readonly userOtp;
    private readonly mailService;
    private readonly iv;
    private readonly otpTTL;
    constructor(jwtService: JwtService, userCredentialsRepository: Repository<UserCredentials>, employeeRepository: Repository<Employee>, userOtp: Repository<UserOtp>, mailService: MailService);
    showProfile(id: number): Promise<any>;
    validateUserGoogle(details: UserDetails): Promise<Employee>;
    findUser(id: number): Promise<Employee>;
    googleLogin(req: any): "No user from Google" | {
        message: string;
        user: any;
        success?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        user?: undefined;
    };
    refreshAccessToken(refreshToken: string): Promise<string>;
}
