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
exports.CreateEmployeeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateEmployeeDto {
}
exports.CreateEmployeeDto = CreateEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The name of the employee",
        example: "ABC",
    }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The email of the employee",
        example: "abc@gmail.com",
    }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The contact number of the employee",
        example: "7654567823",
    }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "mobile_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The department id of the employee",
        example: 1,
    }),
    __metadata("design:type", Number)
], CreateEmployeeDto.prototype, "department_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date of birth of employee",
        example: "2003-05-08",
    }),
    __metadata("design:type", Date)
], CreateEmployeeDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The gender of the employee (Male/Female/Other)",
        example: "Female",
    }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The manager id of the employee",
        example: 1,
    }),
    __metadata("design:type", Number)
], CreateEmployeeDto.prototype, "manager_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The inventory id of the inventory",
        example: 1,
    }),
    __metadata("design:type", Number)
], CreateEmployeeDto.prototype, "inventory_id", void 0);
//# sourceMappingURL=create-employee.dto.js.map