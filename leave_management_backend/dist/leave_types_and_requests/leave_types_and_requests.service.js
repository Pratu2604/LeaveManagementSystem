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
exports.LeaveTypesAndRequestsService = void 0;
const common_1 = require("@nestjs/common");
const LeaveRequest_entity_1 = require("./entities/LeaveRequest.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const mail_service_1 = require("../mail/mail.service");
const Employee_entity_1 = require("../employee/entities/Employee.entity");
let LeaveTypesAndRequestsService = class LeaveTypesAndRequestsService {
    constructor(leaveRequestRepository, mailService, employeeRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.mailService = mailService;
        this.employeeRepository = employeeRepository;
    }
    async createRequest(createLeaveDto, req_mail, emp_id) {
        const newLeaveRequest = this.leaveRequestRepository.create(createLeaveDto);
        newLeaveRequest.created_by = req_mail;
        newLeaveRequest.emp_id = emp_id;
        const savedLeaveRequest = await this.leaveRequestRepository.save(newLeaveRequest);
        const employee = await this.employeeRepository.findOne({ where: { email: req_mail } });
        const employeeName = employee ? employee.name : "Unknown";
        const fromDateAndStartDate = `${createLeaveDto.start_date} to ${createLeaveDto.end_date}`;
        try {
            const employee = await this.employeeRepository.findOne({
                where: { id: emp_id },
                relations: ['manager'],
            });
            if (!employee) {
                throw new common_1.NotFoundException('Employee not found');
            }
            const managerEmail = employee.manager?.email;
            console.log("managerEmail:", managerEmail);
            if (!managerEmail) {
                console.warn('Manager email not found for employee:', employee.id);
            }
            else {
                console.log("req_mail", req_mail, "managerEmail", managerEmail);
                await this.mailService.sendLeaveRequestEmail(req_mail, managerEmail, createLeaveDto.reason, employeeName, fromDateAndStartDate);
            }
            return savedLeaveRequest;
        }
        catch (error) {
            console.error('Error creating leave request:', error);
            throw new common_1.InternalServerErrorException('Error creating leave request');
        }
    }
    findOne(id) {
        console.log(id);
        return this.leaveRequestRepository.findOneBy({ id });
    }
    async findAllByEmployeeId(emp_id) {
        return await this.leaveRequestRepository.find({
            where: { emp_id },
        });
    }
    findAll() {
        return this.leaveRequestRepository.find({});
    }
    async updateStatus(leave_request_id, status, req_mail) {
        const leaveRequest = await this.findOne(leave_request_id);
        leaveRequest.status = status;
        leaveRequest.updated_by = req_mail;
        const employee = await this.employeeRepository.findOne({ where: { email: req_mail } });
        const employeeName = employee ? employee.name : "Unknown";
        const employeeEmail = leaveRequest.created_by;
        const updatedLeaveRequest = await this.leaveRequestRepository.save(leaveRequest);
        const message = `Your leave request has been ${status} by ${employeeName}.`;
        if (updatedLeaveRequest) {
            await this.mailService.sendLeaveStatusEmail(employeeEmail, message);
        }
        return { leaveRequest: updatedLeaveRequest, message };
    }
    async getLeaveRequest(id) {
        const leaveRequest = await this.leaveRequestRepository.findOneBy({ id });
        if (!leaveRequest) {
            throw new common_1.BadRequestException('No Leave Request Found');
        }
        return leaveRequest;
    }
    async getEmployeesWithPendingLeaveRequests() {
        try {
            const pendingRequests = await this.leaveRequestRepository.find({
                where: {
                    status: 'pending',
                },
                relations: ['employee'],
            });
            return pendingRequests.map((request) => ({
                id: request.id,
                employeeName: request.employee.name,
                start_date: request.start_date,
                end_date: request.end_date,
                leave_type: request.leave_type,
                reason: request.reason,
                manager_id: request.employee.manager_id,
            }));
        }
        catch (error) {
            console.error('Error fetching employees with pending requests:', error);
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRemainingLeaveBalance(id) {
        try {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentMonth >= 3
                ? currentDate.getFullYear()
                : currentDate.getFullYear() - 1;
            const leaveRequests = await this.leaveRequestRepository.find({
                where: {
                    emp_id: id,
                },
            });
            let default_balance = 21;
            let remainingBalance = default_balance;
            leaveRequests.forEach((request) => {
                const startDate = new Date(request.start_date);
                const endDate = request.end_date ? new Date(request.end_date) : null;
                const startYear = startDate.getFullYear();
                const startMonth = startDate.getMonth();
                if (startYear === currentYear && startMonth >= 3) {
                    let daysDifference;
                    if (endDate) {
                        const millisecondsPerDay = 1000 * 60 * 60 * 24;
                        const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
                        daysDifference =
                            Math.ceil(differenceInMilliseconds / millisecondsPerDay) + 1;
                    }
                    else {
                        daysDifference = 1;
                    }
                    if (request.status === 'approved' || request.status === 'pending') {
                        switch (request.leave_type) {
                            case 'full':
                                remainingBalance -= daysDifference;
                                break;
                            case 'first half':
                            case 'second half':
                                remainingBalance -= daysDifference / 2;
                                break;
                            default:
                                break;
                        }
                    }
                }
            });
            remainingBalance = Math.max(remainingBalance, 0);
            return {
                remainingBalance: remainingBalance,
                default_balance: default_balance,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to calculate remaining leave balance');
        }
    }
    async getRemainingLeaveBalanceforworkfromhome(id) {
        try {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            const approvedRequests = await this.leaveRequestRepository.find({
                where: {
                    emp_id: id,
                    leave_type: 'work from home',
                    status: (0, typeorm_1.In)(['approved', 'pending']),
                },
            });
            const defaultBalancePerMonth = new Array(12).fill(3);
            approvedRequests.forEach((request) => {
                const startDate = new Date(request.start_date);
                const endDate = request.end_date ? new Date(request.end_date) : null;
                const startMonth = startDate.getMonth();
                const startYear = startDate.getFullYear();
                const endMonth = endDate ? endDate.getMonth() : null;
                const endYear = endDate ? endDate.getFullYear() : null;
                let startDay = startDate.getDate();
                let endDay = endDate ? endDate.getDate() : null;
                if (startYear === currentYear) {
                    if (startMonth === currentMonth) {
                        if (endMonth === currentMonth) {
                            defaultBalancePerMonth[currentMonth] -= endDay - startDay + 1;
                        }
                        else {
                            const daysInStartMonth = new Date(startYear, startMonth + 1, 0).getDate();
                            defaultBalancePerMonth[currentMonth] -= daysInStartMonth - startDay + 1;
                        }
                    }
                    else if (endMonth === currentMonth) {
                        defaultBalancePerMonth[currentMonth] -= endDay;
                    }
                }
            });
            const remainingWorkFromHomeBalance = Math.max(defaultBalancePerMonth[currentMonth], 0);
            return {
                remainingBalance: remainingWorkFromHomeBalance,
                defaultBalance: 3,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to calculate remaining work from home balance');
        }
    }
    async findAllRequestsByEmployeeId(emp_id) {
        if (emp_id)
            return await this.employeeRepository.find({
                where: [
                    { manager_id: emp_id },
                ],
            });
    }
    async findPendingRequestsByEmployeeId(employeeId) {
        return this.leaveRequestRepository.find({
            where: { emp_id: employeeId, status: 'pending' },
            relations: ['employee'],
        });
    }
    async getEmployeesOnLeaveToday(managerId, role) {
        try {
            const today = new Date();
            const leaveRequests = await this.leaveRequestRepository.find({
                where: { status: 'approved' },
                relations: ['employee'],
            });
            const filteredLeaveRequests = leaveRequests.filter((leaveRequest) => {
                const startDate = new Date(leaveRequest.start_date);
                const endDate = leaveRequest.end_date
                    ? new Date(leaveRequest.end_date)
                    : null;
                const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
                const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const todayDateString = today.toISOString().slice(0, 10);
                const isOnLeaveToday = (endDate === null && startDate.toISOString().slice(0, 10) === todayDateString) ||
                    (endDate !== null &&
                        startDate.toISOString().slice(0, 10) <= todayDateString &&
                        endDate.toISOString().slice(0, 10) >= todayDateString);
                if (role === 'Admin') {
                    return isOnLeaveToday;
                }
                else {
                    return (isOnLeaveToday && leaveRequest.employee.manager_id === managerId);
                }
            });
            const employeesOnLeaveToday = filteredLeaveRequests.map((leaveRequest) => {
                return {
                    leaveRequest,
                };
            });
            console.log("employeesOnLeaveToday", employeesOnLeaveToday);
            return employeesOnLeaveToday;
        }
        catch (error) {
            console.error('Error fetching employees on leave today:', error);
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.LeaveTypesAndRequestsService = LeaveTypesAndRequestsService;
exports.LeaveTypesAndRequestsService = LeaveTypesAndRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(LeaveRequest_entity_1.LeaveRequest)),
    __param(2, (0, typeorm_2.InjectRepository)(Employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        mail_service_1.MailService,
        typeorm_1.Repository])
], LeaveTypesAndRequestsService);
//# sourceMappingURL=leave_types_and_requests.service.js.map