import { Employee } from 'src/employee/entities/Employee.entity';
import { Category } from './inventoryCategory.entity';
export declare class Inventory {
    id: number;
    name: string;
    serial_number: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    deleted_at: Date;
    deleted_by: string;
    employee: Employee;
    category: Category;
}
