import { Employee } from '../../employee/entities/Employee.entity';
export declare class Department {
    id: number;
    department_name: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    deleted_at: Date;
    deleted_by: string;
    employees: Employee[];
}
