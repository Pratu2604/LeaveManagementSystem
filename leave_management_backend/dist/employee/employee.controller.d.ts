/// <reference types="node" />
/// <reference types="multer" />
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/Employee.entity';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto, req: any): Promise<Employee>;
    deleteEmployee(id: number, req: any): Promise<string>;
    showProfile(id: number): Promise<any>;
    showEmployeeList(): Promise<{
        role: any;
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
        manager_id: number;
        manager: Employee;
        department_id: number;
        department: import("../department/entity/Department.entity").Department;
        admin: boolean;
        image: Buffer;
        leaveRequests: import("../leave_types_and_requests/entities/LeaveRequest.entity").LeaveRequest[];
        inventories: import("../inventory/entities/inventory.entity").Inventory[];
        projects: import("../project/entities/project.entity").Project[];
        project: import("../project/entities/project.entity").Project[];
        userOtp: import("../auth/entities/userOtp.entity").UserOtp;
    }[]>;
    showManagerList(): Promise<any[]>;
    uploadImage(id: number, image: Express.Multer.File): Promise<Employee>;
}
