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
exports.LeaveRequest = void 0;
const typeorm_1 = require("typeorm");
const Employee_entity_1 = require("../../employee/entities/Employee.entity");
const swagger_1 = require("@nestjs/swagger");
let LeaveRequest = class LeaveRequest {
};
exports.LeaveRequest = LeaveRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'The id of leave request'
    }),
    __metadata("design:type", Number)
], LeaveRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    (0, swagger_1.ApiProperty)({
        description: 'the id of employee'
    }),
    __metadata("design:type", Number)
], LeaveRequest.prototype, "emp_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['first half', 'second half', 'full', 'work from home'],
    }),
    (0, swagger_1.ApiProperty)({
        description: 'the type of leave'
    }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "leave_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    (0, swagger_1.ApiProperty)({
        description: 'start date for leave'
    }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    (0, swagger_1.ApiProperty)({
        description: 'end date for leave'
    }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'reason for the leave'
    }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'status of leave request'
    }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    (0, swagger_1.ApiProperty)({
        description: 'The date at which leave request created'
    }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    (0, swagger_1.ApiProperty)({
        description: 'leave request created by '
    }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'The date at which leave request updated'
    }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    (0, swagger_1.ApiProperty)({
        description: 'The leave request updated by'
    }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Employee_entity_1.Employee, (employee) => employee.leaveRequests),
    (0, typeorm_1.JoinColumn)({ name: 'emp_id' }),
    __metadata("design:type", Employee_entity_1.Employee)
], LeaveRequest.prototype, "employee", void 0);
exports.LeaveRequest = LeaveRequest = __decorate([
    (0, typeorm_1.Entity)('leave_request')
], LeaveRequest);
//# sourceMappingURL=LeaveRequest.entity.js.map