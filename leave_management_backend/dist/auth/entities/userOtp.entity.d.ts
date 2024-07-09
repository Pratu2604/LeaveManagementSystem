import { Employee } from 'src/employee/entities/Employee.entity';
export declare class UserOtp {
    id: number;
    otpCode: string;
    createdAt: Date;
    expiresAt: Date;
    employeeId: Employee;
}
