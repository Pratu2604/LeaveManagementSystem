/// <reference types="node" />
import { Department } from '../../department/entity/Department.entity';
import { LeaveRequest } from '../../leave_types_and_requests/entities/LeaveRequest.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Project } from 'src/project/entities/project.entity';
import { UserOtp } from 'src/auth/entities/userOtp.entity';
export declare class Employee {
    id: number;
    name: string;
    email: string;
    mobile_number: string;
    dob: Date;
    gender: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    deleted_at: Date;
    deleted_by: string;
    manager_id: number | null;
    manager: Employee | null;
    department_id: number | null;
    department: Department;
    admin: boolean;
    image: Buffer;
    leaveRequests: LeaveRequest[];
    inventories: Inventory[];
    projects: Project[];
    project: Project[];
    userOtp: UserOtp;
}
