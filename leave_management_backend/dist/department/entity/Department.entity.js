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
exports.Department = void 0;
const typeorm_1 = require("typeorm");
const Employee_entity_1 = require("../../employee/entities/Employee.entity");
const swagger_1 = require("@nestjs/swagger");
let Department = class Department {
};
exports.Department = Department;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The department id '
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Department.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The department name '
    }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Department.prototype, "department_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'the date on which department created'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Department.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'department created by'
    }),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Department.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Department.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Department.prototype, "updated_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date on which department deleted'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Department.prototype, "deleted_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'department deleted by'
    }),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Department.prototype, "deleted_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.OneToMany)(() => Employee_entity_1.Employee, (employee) => employee.department),
    __metadata("design:type", Array)
], Department.prototype, "employees", void 0);
exports.Department = Department = __decorate([
    (0, typeorm_1.Entity)('department')
], Department);
//# sourceMappingURL=Department.entity.js.map