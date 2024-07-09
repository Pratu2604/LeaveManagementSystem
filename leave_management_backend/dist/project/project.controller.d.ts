import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { AssignProjectDto } from './dto/assign-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    addProject(createProjectDto: CreateProjectDto, req: any): Promise<Project>;
    findAllProject(): Promise<Project[]>;
    findOneProject(id: number): Promise<Project | {
        message: string;
        project: Project;
    }>;
    updateProject(id: number, updateProjectDto: UpdateProjectDto, req: any): Promise<Project>;
    assignProject({ employeeId, projectId }: AssignProjectDto, req: any): Promise<string>;
    updateProjectStatus(project_id: number, body: {
        status: string;
    }, req: any): Promise<Project>;
}
