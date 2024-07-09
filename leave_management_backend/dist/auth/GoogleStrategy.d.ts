import { JwtService } from '@nestjs/jwt';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from "./auth.service";
import { VerifiedCallback } from "passport-jwt";
import { Employee } from "src/employee/entities/Employee.entity";
import { Repository } from "typeorm";
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly employeeRepository;
    private jwtService;
    private readonly authService;
    constructor(employeeRepository: Repository<Employee>, jwtService: JwtService, authService: AuthService);
    authorizationParams(): {
        [key: string]: string;
    };
    validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifiedCallback): Promise<void>;
}
export {};
