import { Employee } from 'src/employee/entities/Employee.entity';
export declare class LeaveRequest {
    id: number;
    emp_id: number;
    leave_type: string;
    start_date: Date;
    end_date: Date;
    reason: string;
    status: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    employee: Employee;
}
