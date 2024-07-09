"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entities/project.entity");
const typeorm_2 = require("typeorm");
const Employee_entity_1 = require("../employee/entities/Employee.entity");
let ProjectService = class ProjectService {
    constructor(projectRepository, employeeRepository) {
        this.projectRepository = projectRepository;
        this.employeeRepository = employeeRepository;
    }
    async addProject(createProjectDto, req_mail) {
        const newProject = this.projectRepository.create(createProjectDto);
        newProject.created_by = req_mail;
        const manager = await this.employeeRepository.findOneBy({ id: createProjectDto.manager_id });
        if (!manager) {
            throw new Error('Manager not found for the provided ID');
        }
        newProject.manager = manager;
        const newProject1 = await this.projectRepository.save(newProject);
        await this.assignProject({ employeeId: manager.id, projectId: newProject1.id });
        return newProject1;
    }
    async showAllProjects() {
        return await this.projectRepository.find({ relations: ['manager', 'employee'] });
    }
    async findOneProject(id) {
        const project = await this.projectRepository.findOne({ where: { id, status: 'active', }, relations: ['employee', 'manager'] });
        if (!project) {
            return { message: `Project with ID ${id} not found`, project };
        }
        project.employee = project.employee.filter(emp => !emp.deleted_at);
        return project;
    }
    async updateProject(projectId, updateProjectDto, req_mail) {
        const project = await this.projectRepository.findOne({
            relations: {
                employee: true,
            },
            where: { id: projectId }
        });
        if (!project) {
            throw new Error('Project not found for the provided ID');
        }
        Object.assign(project, updateProjectDto);
        project.updated_by = req_mail;
        if (updateProjectDto.manager_id && updateProjectDto.manager_id !== project.manager?.id) {
            const newManager = await this.employeeRepository.findOneBy({ id: updateProjectDto.manager_id });
            if (!newManager) {
                throw new Error('Manager not found for the provided ID');
            }
            project.manager = newManager;
            project.employee = [newManager];
        }
        const updatedProject = await this.projectRepository.save(project);
        return updatedProject;
    }
    async assignProject({ employeeId, projectId }) {
        try {
            const [project, employee] = await Promise.all([
                this.projectRepository.findOne({
                    relations: {
                        employee: true,
                    },
                    where: { id: projectId }
                }),
                this.employeeRepository.findOne({ where: { id: employeeId } }),
            ]);
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            if (!employee) {
                throw new common_1.NotFoundException('Employee not found');
            }
            console.log("project", project);
            project.employee.push(employee);
            await this.projectRepository.save(project);
            return `${project.name} assigned sucessfully to the ${employee.name}.`;
        }
        catch (error) {
            throw error;
        }
    }
    async getAssignedProjects(employeeId) {
        try {
            const employee = await this.employeeRepository.findOne({
                where: {
                    id: employeeId
                },
                relations: ['projects'],
            });
            if (!employee) {
                throw new common_1.NotFoundException('Employee not found');
            }
            return {
                assignedProjects: employee.projects,
                projectCount: employee.projects.length,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateProjectStatus(projectId, body, req_mail) {
        const project = await this.projectRepository.findOne({ where: { id: projectId } });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        project.status = body.status;
        project.updated_by = req_mail;
        return await this.projectRepository.save(project);
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(Employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectService);
//# sourceMappingURL=project.service.js.map