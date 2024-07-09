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
exports.LeaveTypesAndRequestsController = void 0;
const common_1 = require("@nestjs/common");
const leave_types_and_requests_service_1 = require("./leave_types_and_requests.service");
const create_leave_types_and_request_dto_1 = require("./dto/create-leave_types_and_request.dto");
const LeaveRequest_entity_1 = require("./entities/LeaveRequest.entity");
const swagger_1 = require("@nestjs/swagger");
const update_leave_status_dto_1 = require("./dto/update-leave_status.dto");
const JwtAuthGuard_1 = require("../auth/guards/JwtAuthGuard");
let LeaveTypesAndRequestsController = class LeaveTypesAndRequestsController {
    constructor(leaveTypesAndRequestsService) {
        this.leaveTypesAndRequestsService = leaveTypesAndRequestsService;
    }
    createRequest(createLeaveTypesAndRequestDto, req) {
        const req_mail = req.user.user.email;
        const emp_id = req.user.user.id;
        return this.leaveTypesAndRequestsService.createRequest(createLeaveTypesAndRequestDto, req_mail, emp_id);
    }
    async findAll() {
        return this.leaveTypesAndRequestsService.findAll();
    }
    findOne(leave_request_id) {
        return this.leaveTypesAndRequestsService.findOne(leave_request_id);
    }
    async updateStatus(leave_request_id, body, req) {
        const req_mail = req.user.user.email;
        if (!body.status) {
            throw new common_1.BadRequestException('Status is required');
        }
        const { leaveRequest, message } = await this.leaveTypesAndRequestsService.updateStatus(leave_request_id, body.status, req_mail);
        return { leaveRequest, message };
    }
    async getEmployeesWithPendingRequests() {
        try {
            const employeesWithPendingRequests = await this.leaveTypesAndRequestsService.getEmployeesWithPendingLeaveRequests();
            return employeesWithPendingRequests;
        }
        catch (error) {
            console.error('Error getting employees with pending requests:', error);
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRemainingLeaveBalance(id) {
        if (!id || isNaN(id)) {
            throw new common_1.BadRequestException('Invalid employee ID');
        }
        return this.leaveTypesAndRequestsService.getRemainingLeaveBalance(id);
    }
    async getRemainingLeaveBalanceforworkfromhome(id) {
        if (!id || isNaN(id)) {
            throw new common_1.BadRequestException('Invalid employee ID');
        }
        return this.leaveTypesAndRequestsService.getRemainingLeaveBalanceforworkfromhome(id);
    }
    async findAllByEmployeeId(employeeId) {
        return await this.leaveTypesAndRequestsService.findAllByEmployeeId(employeeId);
    }
    async getEmployeesOnLeaveToday(req) {
        const loggedInEmployeeId = req.user.user.id;
        const role = req.user.user.role;
        try {
            const employeesOnLeave = await this.leaveTypesAndRequestsService.getEmployeesOnLeaveToday(loggedInEmployeeId, role);
            return employeesOnLeave;
        }
        catch (error) {
            console.error('Error fetching employees on leave today:', error);
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAllRequestsByEmployeeId(employeeId) {
        try {
            const pendingRequests = [];
            const ab = await this.leaveTypesAndRequestsService.findAllRequestsByEmployeeId(employeeId);
            for (const employee of ab) {
                const employeeRequests = await this.leaveTypesAndRequestsService.findPendingRequestsByEmployeeId(employee.id);
                pendingRequests.push(...employeeRequests);
            }
            return { pendingRequests };
        }
        catch (error) {
            console.error('Error occurred while fetching pending requests:', error);
        }
    }
};
exports.LeaveTypesAndRequestsController = LeaveTypesAndRequestsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Leave request created',
        type: LeaveRequest_entity_1.LeaveRequest
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_types_and_request_dto_1.CreateLeaveTypesAndRequestDto, Object]),
    __metadata("design:returntype", void 0)
], LeaveTypesAndRequestsController.prototype, "createRequest", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get all leave requests',
        type: [LeaveRequest_entity_1.LeaveRequest]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LeaveTypesAndRequestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':leave_request_id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get leave requests of employee with given id',
        type: LeaveRequest_entity_1.LeaveRequest
    }),
    __param(0, (0, common_1.Param)('leave_request_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LeaveTypesAndRequestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':leave_request_id/status'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'leave request status will be updated as response'
    }),
    (0, swagger_1.ApiBody)({
        type: update_leave_status_dto_1.UpdateLeaveStatus
    }),
    __param(0, (0, common_1.Param)('leave_request_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypesAndRequestsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('employees/pending-requests'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get employee list whose leave request status is pending'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LeaveTypesAndRequestsController.prototype, "getEmployeesWithPendingRequests", null);
__decorate([
    (0, common_1.Get)('remaining-balance/:empId'),
    (0, swagger_1.ApiParam)({ name: 'empId', description: 'Employee ID' }),
    __param(0, (0, common_1.Param)('empId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LeaveTypesAndRequestsController.prototype, "getRemainingLeaveBalance", null);
__decorate([
    (0, common_1.Get)('remaining-balance/work-from-home/:empId'),
    (0, swagger_1.ApiParam)({ name: 'empId', description: 'Employee ID' }),
    __param(0, (0, common_1.Param)('empId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LeaveTypesAndRequestsController.prototype, "getRemainingLeaveBalanceforworkfromhome", null);
__decorate([
    (0, common_1.Get)(':employeeId/requests'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LeaveTypesAndRequestsController.prototype, "findAllByEmployeeId", null);
__decorate([
    (0, common_1.Get)('employees/employees-leave-on-today'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get employees on leave today ',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaveTypesAndRequestsController.prototype, "getEmployeesOnLeaveToday", null);
__decorate([
    (0, common_1.Get)(':employeeId/pending-requests'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get list of pending leave requests of employees who have manager with given id',
        type: LeaveRequest_entity_1.LeaveRequest
    }),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LeaveTypesAndRequestsController.prototype, "findAllRequestsByEmployeeId", null);
exports.LeaveTypesAndRequestsController = LeaveTypesAndRequestsController = __decorate([
    (0, swagger_1.ApiTags)('Leave Request'),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)('leave'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [leave_types_and_requests_service_1.LeaveTypesAndRequestsService])
], LeaveTypesAndRequestsController);
//# sourceMappingURL=leave_types_and_requests.controller.js.map