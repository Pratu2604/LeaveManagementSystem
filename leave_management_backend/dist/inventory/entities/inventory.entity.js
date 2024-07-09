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
exports.Inventory = void 0;
const typeorm_1 = require("typeorm");
const Employee_entity_1 = require("../../employee/entities/Employee.entity");
const inventoryCategory_entity_1 = require("./inventoryCategory.entity");
const swagger_1 = require("@nestjs/swagger");
const create_employee_dto_1 = require("../../employee/dto/create-employee.dto");
const create_inventoryCategory_dto_1 = require("../dto/create-inventoryCategory.dto");
let Inventory = class Inventory {
};
exports.Inventory = Inventory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Id of the Inventory'
    }),
    __metadata("design:type", Number)
], Inventory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({
        description: 'Name of the Inventory'
    }),
    __metadata("design:type", String)
], Inventory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'serial Number of the Inventory'
    }),
    __metadata("design:type", String)
], Inventory.prototype, "serial_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    (0, swagger_1.ApiProperty)({
        description: 'The date time at which inventory created'
    }),
    __metadata("design:type", Date)
], Inventory.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    (0, swagger_1.ApiProperty)({
        description: 'Inventory created by'
    }),
    __metadata("design:type", String)
], Inventory.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Inventory.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    (0, swagger_1.ApiProperty)({
        description: 'Inventory updated by'
    }),
    __metadata("design:type", String)
], Inventory.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'The date time at which inventory deleted'
    }),
    __metadata("design:type", Date)
], Inventory.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    (0, swagger_1.ApiProperty)({
        description: 'Inventory deleted by'
    }),
    __metadata("design:type", String)
], Inventory.prototype, "deleted_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Employee_entity_1.Employee, (employee) => employee.inventories),
    (0, swagger_1.ApiProperty)({
        description: 'Employee who have inventory',
        type: create_employee_dto_1.CreateEmployeeDto
    }),
    __metadata("design:type", Employee_entity_1.Employee)
], Inventory.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventoryCategory_entity_1.Category, (category) => category.inventories),
    (0, swagger_1.ApiProperty)({
        description: 'category of the inventory',
        type: create_inventoryCategory_dto_1.CreateInvetoryCategoryDto
    }),
    __metadata("design:type", inventoryCategory_entity_1.Category)
], Inventory.prototype, "category", void 0);
exports.Inventory = Inventory = __decorate([
    (0, typeorm_1.Entity)('inventories')
], Inventory);
//# sourceMappingURL=inventory.entity.js.map