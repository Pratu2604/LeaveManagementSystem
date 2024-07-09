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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const UserCredentials_entity_1 = require("./entities/UserCredentials.entity");
const typeorm_2 = require("typeorm");
const dotenv = require("dotenv");
const mail_service_1 = require("../mail/mail.service");
const Employee_entity_1 = require("../employee/entities/Employee.entity");
const userOtp_entity_1 = require("./entities/userOtp.entity");
dotenv.config();
let AuthService = class AuthService {
    constructor(jwtService, userCredentialsRepository, employeeRepository, userOtp, mailService) {
        this.jwtService = jwtService;
        this.userCredentialsRepository = userCredentialsRepository;
        this.employeeRepository = employeeRepository;
        this.userOtp = userOtp;
        this.mailService = mailService;
        this.iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
        this.otpTTL = 300000;
    }
    async showProfile(id) {
        try {
            const employee = await this.employeeRepository.findOne({
                where: { id, deleted_at: (0, typeorm_2.IsNull)() },
            });
            const managerIDs = await this.employeeRepository.find({
                where: { deleted_at: (0, typeorm_2.IsNull)() },
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
                return { message: "user deleted" };
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async validateUserGoogle(details) {
        console.log("*************************************");
        console.log('AuthService');
        console.log(details);
        let user = await this.employeeRepository.findOneBy({ email: details.email });
        console.log(user);
        if (user) {
            if (user.deleted_at || user.deleted_by) {
                console.log('User is soft-deleted. Restoring...');
                user.deleted_at = null;
                user.deleted_by = null;
                user.department_id = null;
                user.manager_id = null;
                user.admin = false;
                user.name = details.name;
                await this.employeeRepository.save(user);
                return user;
            }
            else {
                console.log('User found. Updating...');
                user.name = details.name;
                await this.employeeRepository.save(user);
                return user;
            }
        }
        else {
            console.log('User not found. Creating...');
            const newUser = this.employeeRepository.create({ ...details, created_by: details.email });
            console.log("details............", details);
            console.log("newUser............", newUser);
            return this.employeeRepository.save(newUser);
        }
    }
    async findUser(id) {
        const user = await this.employeeRepository.findOneBy({ id });
        return user;
    }
    googleLogin(req) {
        try {
            if (!req.user) {
                return 'No user from Google';
            }
            return {
                message: 'User Info from Google',
                user: req.user
            };
        }
        catch (error) {
            console.error('Error during Google login:', error);
            return {
                success: false,
                message: 'Failed to authenticate Google user',
                error: error.message,
            };
        }
    }
    async refreshAccessToken(refreshToken) {
        try {
            const response = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    refresh_token: refreshToken,
                    grant_type: 'refresh_token',
                }),
            });
            const data = await response.json();
            if (!data.access_token) {
                throw new Error('Failed to obtain access token');
            }
            return data.access_token;
        }
        catch (error) {
            throw new Error(`Error refreshing access token: ${error.message}`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(UserCredentials_entity_1.UserCredentials)),
    __param(2, (0, typeorm_1.InjectRepository)(Employee_entity_1.Employee)),
    __param(3, (0, typeorm_1.InjectRepository)(userOtp_entity_1.UserOtp)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map