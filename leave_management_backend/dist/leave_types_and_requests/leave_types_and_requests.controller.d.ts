import { LeaveTypesAndRequestsService } from './leave_types_and_requests.service';
import { CreateLeaveTypesAndRequestDto } from './dto/create-leave_types_and_request.dto';
import { LeaveRequest } from './entities/LeaveRequest.entity';
import { Employee } from 'src/employee/entities/Employee.entity';
export declare class LeaveTypesAndRequestsController {
    private readonly leaveTypesAndRequestsService;
    leaveService: any;
    constructor(leaveTypesAndRequestsService: LeaveTypesAndRequestsService);
    createRequest(createLeaveTypesAndRequestDto: CreateLeaveTypesAndRequestDto, req: any): Promise<LeaveRequest>;
    findAll(): Promise<LeaveRequest[]>;
    findOne(leave_request_id: number): Promise<LeaveRequest>;
    updateStatus(leave_request_id: number, body: {
        status: string;
    }, req: any): Promise<{
        leaveRequest: LeaveRequest;
        message: string;
    }>;
    getEmployeesWithPendingRequests(): Promise<{
        employeeName: string;
        start_date: Date;
        end_date: Date;
        leave_type: string;
        reason: string;
    }[]>;
    getRemainingLeaveBalance(id: number): Promise<number>;
    getRemainingLeaveBalanceforworkfromhome(id: number): Promise<number>;
    findAllByEmployeeId(employeeId: number): Promise<LeaveRequest[]>;
    getEmployeesOnLeaveToday(req: any): Promise<Employee[]>;
    findAllRequestsByEmployeeId(employeeId: number): Promise<{
        pendingRequests: LeaveRequest[];
    }>;
}
