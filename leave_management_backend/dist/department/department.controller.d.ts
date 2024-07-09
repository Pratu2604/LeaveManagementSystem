import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from './entity/Department.entity';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    createDepartment(createDepartmentDto: CreateDepartmentDto, req: any): Promise<Department>;
    showDepartmentList(): Promise<Department[]>;
    deleteDepartment(id: number, req: any): Promise<string>;
}
