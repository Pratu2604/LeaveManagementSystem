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
exports.Employee = void 0;
const typeorm_1 = require("typeorm");
const Department_entity_1 = require("../../department/entity/Department.entity");
const LeaveRequest_entity_1 = require("../../leave_types_and_requests/entities/LeaveRequest.entity");
const swagger_1 = require("@nestjs/swagger");
const inventory_entity_1 = require("../../inventory/entities/inventory.entity");
const project_entity_1 = require("../../project/entities/project.entity");
const userOtp_entity_1 = require("../../auth/entities/userOtp.entity");
let Employee = class Employee {
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'The id of Employee'
    }),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)({
        description: 'The name of Employee'
    }),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    (0, swagger_1.ApiProperty)({
        description: 'The email of Employee'
    }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    (0, swagger_1.ApiProperty)({
        description: 'The mobile number of Employee'
    }),
    __metadata("design:type", String)
], Employee.prototype, "mobile_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'The date of birth of Employee'
    }),
    __metadata("design:type", Date)
], Employee.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'enum',
        enum: ['Male', 'Female', 'Other'],
    }),
    (0, swagger_1.ApiProperty)({
        description: 'The gender of Employee'
    }),
    __metadata("design:type", String)
], Employee.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    (0, swagger_1.ApiProperty)({
        description: 'When employee was Created'
    }),
    __metadata("design:type", Date)
], Employee.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    (0, swagger_1.ApiProperty)({
        description: 'employee created by'
    }),
    __metadata("design:type", String)
], Employee.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' }),
    (0, swagger_1.ApiProperty)({
        description: 'When employee was Updated'
    }),
    __metadata("design:type", Date)
], Employee.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    (0, swagger_1.ApiProperty)({
        description: 'Employee Updated By'
    }),
    __metadata("design:type", String)
], Employee.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'The date at which employee deleted'
    }),
    __metadata("design:type", Date)
], Employee.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    (0, swagger_1.ApiProperty)({
        description: 'employee deleted by'
    }),
    __metadata("design:type", String)
], Employee.prototype, "deleted_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    (0, swagger_1.ApiProperty)({
        description: 'The manager id of Employee'
    }),
    __metadata("design:type", Number)
], Employee.prototype, "manager_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.ManyToOne)(() => Employee),
    (0, typeorm_1.JoinColumn)({ name: 'manager_id' }),
    __metadata("design:type", Employee)
], Employee.prototype, "manager", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    (0, swagger_1.ApiProperty)({
        description: 'The department id of Employee'
    }),
    __metadata("design:type", Number)
], Employee.prototype, "department_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.ManyToOne)(() => Department_entity_1.Department, (department) => department.employees),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", Department_entity_1.Department)
], Employee.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, swagger_1.ApiProperty)({
        description: 'Is the employee an admin?'
    }),
    __metadata("design:type", Boolean)
], Employee.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.Column)('longblob', { nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'employee image'
    }),
    __metadata("design:type", Buffer)
], Employee.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LeaveRequest_entity_1.LeaveRequest, (leaveRequest) => leaveRequest.employee),
    (0, typeorm_1.JoinColumn)({ name: 'leave_request_id' }),
    __metadata("design:type", Array)
], Employee.prototype, "leaveRequests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.OneToMany)(() => inventory_entity_1.Inventory, (inventory) => inventory.employee, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", Array)
], Employee.prototype, "inventories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (projects) => projects.employee),
    __metadata("design:type", Array)
], Employee.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => project_entity_1.Project, { cascade: true }),
    (0, typeorm_1.JoinTable)({ name: "employee_project" }),
    __metadata("design:type", Array)
], Employee.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => userOtp_entity_1.UserOtp, (userOtp) => userOtp.employeeId, { cascade: true }),
    __metadata("design:type", userOtp_entity_1.UserOtp)
], Employee.prototype, "userOtp", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employee')
], Employee);
//# sourceMappingURL=Employee.entity.js.map