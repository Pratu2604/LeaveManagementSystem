import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employee/entities/Employee.entity';
export declare class ProjectService {
    private projectRepository;
    private employeeRepository;
    constructor(projectRepository: Repository<Project>, employeeRepository: Repository<Employee>);
    addProject(createProjectDto: CreateProjectDto, req_mail: any): Promise<Project>;
    showAllProjects(): Promise<Project[]>;
    findOneProject(id: number): Promise<Project | {
        message: string;
        project: Project;
    }>;
    updateProject(projectId: number, updateProjectDto: UpdateProjectDto, req_mail: any): Promise<Project>;
    assignProject({ employeeId, projectId }: {
        employeeId: any;
        projectId: any;
    }): Promise<string>;
    getAssignedProjects(employeeId: number): Promise<{
        assignedProjects: Project[];
        projectCount: number;
    }>;
    updateProjectStatus(projectId: number, body: any, req_mail: string): Promise<Project>;
}
