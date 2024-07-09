import { CreateLeaveTypesAndRequestDto } from './dto/create-leave_types_and_request.dto';
import { LeaveRequest } from './entities/LeaveRequest.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { Employee } from 'src/employee/entities/Employee.entity';
export declare class LeaveTypesAndRequestsService {
    private readonly leaveRequestRepository;
    private readonly mailService;
    private readonly employeeRepository;
    constructor(leaveRequestRepository: Repository<LeaveRequest>, mailService: MailService, employeeRepository: Repository<Employee>);
    createRequest(createLeaveDto: CreateLeaveTypesAndRequestDto, req_mail: string, emp_id: number): Promise<LeaveRequest>;
    findOne(id: number): Promise<LeaveRequest>;
    findAllByEmployeeId(emp_id: number): Promise<LeaveRequest[]>;
    findAll(): Promise<LeaveRequest[]>;
    updateStatus(leave_request_id: number, status: string, req_mail: string): Promise<{
        leaveRequest: LeaveRequest;
        message: string;
    }>;
    getLeaveRequest(id: number): Promise<LeaveRequest>;
    getEmployeesWithPendingLeaveRequests(): Promise<{
        employeeName: string;
        start_date: Date;
        end_date: Date;
        leave_type: string;
        reason: string;
    }[]>;
    getRemainingLeaveBalance(id: number): Promise<any>;
    getRemainingLeaveBalanceforworkfromhome(id: number): Promise<any>;
    findAllRequestsByEmployeeId(emp_id: number): Promise<Employee[]>;
    findPendingRequestsByEmployeeId(employeeId: number): Promise<LeaveRequest[]>;
    getEmployeesOnLeaveToday(managerId: number, role: string): Promise<Employee[]>;
}
