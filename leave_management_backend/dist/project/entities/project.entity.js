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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const Employee_entity_1 = require("../../employee/entities/Employee.entity");
const swagger_1 = require("@nestjs/swagger");
const create_employee_dto_1 = require("../../employee/dto/create-employee.dto");
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id of project'
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of project'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Employee_entity_1.Employee, (employee) => employee.projects, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'manager_id' }),
    (0, swagger_1.ApiProperty)({
        description: 'project manager',
        type: create_employee_dto_1.CreateEmployeeDto
    }),
    __metadata("design:type", Employee_entity_1.Employee)
], Project.prototype, "manager", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'description of project'
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'start date of project'
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'end date of project'
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'status of project'
    }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['active', 'inactive'],
        default: 'active',
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'date on which project created'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Project.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'project created by'
    }),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Project.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'the date on which project updated'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Project.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'project updated by'
    }),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Project.prototype, "updated_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'employees of project',
        type: create_employee_dto_1.CreateEmployeeDto
    }),
    (0, typeorm_1.ManyToMany)(() => Employee_entity_1.Employee, { cascade: true }),
    (0, typeorm_1.JoinTable)({ name: 'employee_project' }),
    __metadata("design:type", Array)
], Project.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Employee_entity_1.Employee, (employee) => employee.manager),
    __metadata("design:type", Array)
], Project.prototype, "projects", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)('projects')
], Project);
//# sourceMappingURL=project.entity.js.map