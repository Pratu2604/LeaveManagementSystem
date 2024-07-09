"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypesAndRequestsModule = void 0;
const common_1 = require("@nestjs/common");
const leave_types_and_requests_service_1 = require("./leave_types_and_requests.service");
const leave_types_and_requests_controller_1 = require("./leave_types_and_requests.controller");
const typeorm_1 = require("@nestjs/typeorm");
const LeaveRequest_entity_1 = require("./entities/LeaveRequest.entity");
const holidays_service_1 = require("../holidays/holidays.service");
const holidays_entity_1 = require("../holidays/entities/holidays.entity");
const mail_module_1 = require("../mail/mail.module");
const Employee_entity_1 = require("../employee/entities/Employee.entity");
let LeaveTypesAndRequestsModule = class LeaveTypesAndRequestsModule {
};
exports.LeaveTypesAndRequestsModule = LeaveTypesAndRequestsModule;
exports.LeaveTypesAndRequestsModule = LeaveTypesAndRequestsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([LeaveRequest_entity_1.LeaveRequest, holidays_entity_1.Holidays, Employee_entity_1.Employee]), mail_module_1.MailModule],
        controllers: [leave_types_and_requests_controller_1.LeaveTypesAndRequestsController],
        providers: [leave_types_and_requests_service_1.LeaveTypesAndRequestsService, holidays_service_1.HolidaysService],
    })
], LeaveTypesAndRequestsModule);
//# sourceMappingURL=leave_types_and_requests.module.js.map