import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from './entity/Department.entity';
import { Repository } from 'typeorm';
export declare class DepartmentService {
    private readonly departmentRepository;
    constructor(departmentRepository: Repository<Department>);
    createDepartment(departmentName: CreateDepartmentDto, req_mail: string): Promise<Department>;
    deleteDepartment(id: number, req_mail: string): Promise<Department>;
    findDepartmentList(): Promise<Department[]>;
}
