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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailService = class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    async sendPasswordEmail(email, password) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Account Information',
            text: `Hello,\n\nYour account has been created successfully. Your password is: ${password}\n\nRegards,\nThe Admin Team`
        };
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending password email:', error);
            }
            else {
                console.log('Email sent:', info.response);
            }
        });
    }
    async sendOTPEmail(email, otp) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Password Reset',
            text: `Hello,\n\nYour OTP for password reset is: ${otp}\n\nRegards,\nThe Admin Team`
        };
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP email:', error);
            }
            else {
                console.log('OTP Email sent:', info.response);
            }
        });
    }
    async sendPasswordResetEmail(email) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Successfully',
            text: `Hello,\n\n Your password has been reset successfully. \n\nRegards,\nThe Admin Team`
        };
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP email:', error);
            }
            else {
                console.log('OTP Email sent:', info.response);
            }
        });
    }
    async sendLeaveRequestEmail(email, manager_email, reason, employeeName, fromDateAndStartDate) {
        const adminMailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Leave request for: ${employeeName} from ${fromDateAndStartDate}`,
            text: `Leave request for ${reason}\n\n A leave request has been submitted by ${employeeName}. Please review and take necessary actions.`,
        };
        const managerMailOptions = {
            from: email,
            to: manager_email,
            subject: `Leave request for: ${employeeName} from ${fromDateAndStartDate}`,
            text: `Leave request for ${reason}\n\n A leave request has been submitted by ${employeeName}. Please review and take necessary actions.`,
        };
        await Promise.all([
            this.transporter.sendMail(adminMailOptions),
            this.transporter.sendMail(managerMailOptions),
        ]);
    }
    async sendLeaveStatusEmail(email, message) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Leave Request Status',
            text: message
        };
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP email:', error);
            }
            else {
                console.log('OTP Email sent:', info.response);
            }
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map