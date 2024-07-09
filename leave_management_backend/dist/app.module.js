"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const employee_module_1 = require("./employee/employee.module");
const config_1 = require("@nestjs/config");
const leave_types_and_requests_module_1 = require("./leave_types_and_requests/leave_types_and_requests.module");
const auth_module_1 = require("./auth/auth.module");
const department_module_1 = require("./department/department.module");
const mail_service_1 = require("./mail/mail.service");
const mail_controller_1 = require("./mail/mail.controller");
const mail_module_1 = require("./mail/mail.module");
const inventory_module_1 = require("./inventory/inventory.module");
const project_module_1 = require("./project/project.module");
const holidays_module_1 = require("./holidays/holidays.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            database_module_1.DatabaseModule,
            employee_module_1.EmployeeModule,
            leave_types_and_requests_module_1.LeaveTypesAndRequestsModule,
            auth_module_1.AuthModule,
            department_module_1.DepartmentModule,
            mail_module_1.MailModule,
            inventory_module_1.InventoryModule,
            project_module_1.ProjectModule,
            holidays_module_1.HolidaysModule,
        ],
        controllers: [app_controller_1.AppController, mail_controller_1.MailController],
        providers: [app_service_1.AppService, mail_service_1.MailService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map