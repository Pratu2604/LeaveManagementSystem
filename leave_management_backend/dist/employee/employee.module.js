"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const employee_controller_1 = require("./employee.controller");
const typeorm_1 = require("@nestjs/typeorm");
const Employee_entity_1 = require("./entities/Employee.entity");
const Department_entity_1 = require("../department/entity/Department.entity");
const auth_service_1 = require("../auth/auth.service");
const UserCredentials_entity_1 = require("../auth/entities/UserCredentials.entity");
const mail_module_1 = require("../mail/mail.module");
const inventory_service_1 = require("../inventory/inventory.service");
const inventory_entity_1 = require("../inventory/entities/inventory.entity");
const inventoryCategory_entity_1 = require("../inventory/entities/inventoryCategory.entity");
const userOtp_entity_1 = require("../auth/entities/userOtp.entity");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Employee_entity_1.Employee, Department_entity_1.Department, UserCredentials_entity_1.UserCredentials, inventory_entity_1.Inventory, inventoryCategory_entity_1.Category, userOtp_entity_1.UserOtp]), mail_module_1.MailModule],
        controllers: [employee_controller_1.EmployeeController],
        providers: [employee_service_1.EmployeeService, auth_service_1.AuthService, inventory_service_1.InventoryService],
        exports: [employee_service_1.EmployeeService]
    })
], EmployeeModule);
//# sourceMappingURL=employee.module.js.map