export declare class MailService {
    private transporter;
    constructor();
    sendPasswordEmail(email: string, password: string): Promise<void>;
    sendOTPEmail(email: string, otp: string): Promise<void>;
    sendPasswordResetEmail(email: string): Promise<void>;
    sendLeaveRequestEmail(email: string, manager_email: string, reason: string, employeeName: string, fromDateAndStartDate: string): Promise<void>;
    sendLeaveStatusEmail(email: string, message: string): Promise<void>;
}
