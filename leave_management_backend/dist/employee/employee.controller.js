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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const update_employee_dto_1 = require("./dto/update-employee.dto");
const swagger_1 = require("@nestjs/swagger");
const Employee_entity_1 = require("./entities/Employee.entity");
const platform_express_1 = require("@nestjs/platform-express");
const JwtAuthGuard_1 = require("../auth/guards/JwtAuthGuard");
let EmployeeController = class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async updateEmployee(id, updateEmployeeDto, req) {
        const req_mail = req.user.user.email;
        console.log("req.user......", req.user);
        console.log("req_mail.....", req_mail);
        try {
            return await this.employeeService.updateEmployee(id, updateEmployeeDto, req_mail);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteEmployee(id, req) {
        const req_mail = req.user.user.email;
        try {
            await this.employeeService.deleteEmployee(id, req_mail);
            return 'Employee Deleted Successfully';
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async showProfile(id) {
        try {
            return await this.employeeService.showProfile(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    showEmployeeList() {
        return this.employeeService.findEmployees();
    }
    async showManagerList() {
        console.log("first..............");
        return await this.employeeService.getManagerIds();
    }
    async uploadImage(id, image) {
        if (!image) {
            throw new Error('No image uploaded');
        }
        const employee = await this.employeeService.uploadImage(id, image.buffer);
        return employee;
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Employee with given ID will be updated as response',
        type: Employee_entity_1.Employee
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_employee_dto_1.UpdateEmployeeDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Employee with given ID will be deleted as response'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteEmployee", null);
__decorate([
    (0, common_1.Get)('employee/:id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get employee by id',
        type: Employee_entity_1.Employee
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "showProfile", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'All employees List',
        type: [Employee_entity_1.Employee]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "showEmployeeList", null);
__decorate([
    (0, common_1.Get)('/manager'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "showManagerList", null);
__decorate([
    (0, common_1.Post)('upload-image/:id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiBody)({
        description: 'Image upload',
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "uploadImage", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, swagger_1.ApiTags)('Employees'),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)('employees'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map