import { Employee } from 'src/employee/entities/Employee.entity';
export declare class Project {
    id: number;
    name: string;
    manager: Employee | null;
    description?: string;
    start_date?: Date;
    end_date?: Date;
    status: 'active' | 'inactive';
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    employee: Employee[];
    projects: Employee[];
}
