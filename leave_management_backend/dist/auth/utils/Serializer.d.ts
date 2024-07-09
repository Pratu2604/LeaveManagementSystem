import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Employee } from "src/employee/entities/Employee.entity";
export declare class SessionSerializer extends PassportSerializer {
    private readonly authService;
    constructor(authService: AuthService);
    serializeUser(user: Employee, done: Function): void;
    deserializeUser(payload: any, done: Function): Promise<any>;
}
