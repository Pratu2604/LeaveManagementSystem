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
exports.UpdateEmployeeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateEmployeeDto {
}
exports.UpdateEmployeeDto = UpdateEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The name of the employee",
        example: "ABC",
    }),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The email of the employee",
        example: "abc@gmail.com",
    }),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The contact number of the employee",
        example: "7654567823",
    }),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "mobile_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The department id of the employee",
        example: 1,
    }),
    __metadata("design:type", Number)
], UpdateEmployeeDto.prototype, "department_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The role of the employee",
        example: "employee",
    }),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The manager id of the employee",
        example: 1,
    }),
    __metadata("design:type", Number)
], UpdateEmployeeDto.prototype, "manager_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The inventory id of the inventory",
        example: 1,
    }),
    __metadata("design:type", Number)
], UpdateEmployeeDto.prototype, "inventory_id", void 0);
//# sourceMappingURL=update-employee.dto.js.map