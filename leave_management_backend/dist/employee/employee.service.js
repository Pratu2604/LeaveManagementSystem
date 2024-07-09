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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Employee_entity_1 = require("./entities/Employee.entity");
const auth_service_1 = require("../auth/auth.service");
const UserCredentials_entity_1 = require("../auth/entities/UserCredentials.entity");
const mail_service_1 = require("../mail/mail.service");
const inventory_entity_1 = require("../inventory/entities/inventory.entity");
const inventory_service_1 = require("../inventory/inventory.service");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository, userCredentialRepository, inventoryRepository, inventoryService, authService, mailService) {
        this.employeeRepository = employeeRepository;
        this.userCredentialRepository = userCredentialRepository;
        this.inventoryRepository = inventoryRepository;
        this.inventoryService = inventoryService;
        this.authService = authService;
        this.mailService = mailService;
    }
    async updateEmployee(id, updatedEmployeeDetails, req_mail) {
        const employee = await this.employeeRepository.findOneBy({ id });
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found.');
        }
        for (const key in updatedEmployeeDetails) {
            if (updatedEmployeeDetails[key] !== undefined)
                employee[key] = updatedEmployeeDetails[key];
            if (key === 'inventory_id') {
                const existingAssignment = await this.inventoryRepository.findOne({
                    where: { id: updatedEmployeeDetails.inventory_id },
                    relations: ['employee', 'category'],
                });
                if (existingAssignment && existingAssignment.employee) {
                    throw new common_1.HttpException('Inventory already assigned to another employee', common_1.HttpStatus.BAD_REQUEST);
                }
                else {
                    await this.inventoryService.assignInventoryToEmployee(employee.id, updatedEmployeeDetails.inventory_id);
                }
            }
        }
        employee.updated_by = req_mail;
        return await this.employeeRepository.save(employee);
    }
    async deleteEmployee(id, req_mail) {
        const employee = await this.employeeRepository.findOneBy({ id });
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found.');
        }
        const inventory = await this.inventoryRepository.findOne({ where: { employee: employee } });
        if (inventory) {
            inventory.employee = null;
            await this.inventoryRepository.save(inventory);
        }
        employee.deleted_by = req_mail;
        employee.deleted_at = new Date();
        await this.employeeRepository.save(employee);
        return 'Employee and associated UserCredentials deleted successfully.';
    }
    async showProfile(id) {
        try {
            const employee = await this.employeeRepository.findOne({
                where: { id, deleted_at: (0, typeorm_2.IsNull)() },
                relations: ['manager', 'department', 'inventories', 'project',],
            });
            const managerIDs = await this.employeeRepository.find({
                where: { deleted_at: (0, typeorm_2.IsNull)() },
                select: ['manager_id'],
            });
            if (employee) {
                let role;
                if (employee.admin) {
                    role = 'Admin';
                }
                else if (managerIDs.some(manager => manager.manager_id === employee.id)) {
                    role = 'Manager';
                }
                else {
                    role = 'Employee';
                }
                return { ...employee, role };
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async findEmployees() {
        try {
            const employees = await this.employeeRepository.find({
                where: { deleted_at: (0, typeorm_2.IsNull)() },
                relations: ['manager', 'department', 'project', 'inventories'],
            });
            const managerIds = employees.map((employee) => { if (employee.manager_id)
                return employee.manager_id; });
            const employeesWithRoles = employees.map((employee) => {
                let role;
                if (employee.admin) {
                    role = 'Admin';
                }
                else if (managerIds.includes(employee.id)) {
                    role = 'Manager';
                }
                else {
                    role = 'Employee';
                }
                return { ...employee, role };
            });
            return employeesWithRoles;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async uploadImage(employeeId, imageData) {
        const employee = await this.employeeRepository.findOneBy({ id: employeeId });
        if (!employee) {
            throw new Error(`Employee with ID ${employeeId} not found`);
        }
        employee.image = imageData;
        return await this.employeeRepository.save(employee);
    }
    async findAll() {
        return await this.employeeRepository.find();
    }
    async findById(id) {
        return await this.employeeRepository.findOne({
            where: { id, deleted_at: (0, typeorm_2.IsNull)() },
            relations: ['inventories'],
        });
    }
    async getManagerIds() {
        return await this.employeeRepository.find({
            where: { deleted_at: (0, typeorm_2.IsNull)() },
            select: ['manager_id'],
            relations: ['manager'],
        });
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(UserCredentials_entity_1.UserCredentials)),
    __param(2, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        inventory_service_1.InventoryService,
        auth_service_1.AuthService,
        mail_service_1.MailService])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map