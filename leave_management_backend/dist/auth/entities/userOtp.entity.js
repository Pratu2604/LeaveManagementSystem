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
exports.UserOtp = void 0;
const Employee_entity_1 = require("../../employee/entities/Employee.entity");
const typeorm_1 = require("typeorm");
let UserOtp = class UserOtp {
};
exports.UserOtp = UserOtp;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserOtp.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 6 }),
    __metadata("design:type", String)
], UserOtp.prototype, "otpCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserOtp.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: false }),
    __metadata("design:type", Date)
], UserOtp.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Employee_entity_1.Employee, (employee) => employee.userOtp),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", Employee_entity_1.Employee)
], UserOtp.prototype, "employeeId", void 0);
exports.UserOtp = UserOtp = __decorate([
    (0, typeorm_1.Entity)('userotp')
], UserOtp);
//# sourceMappingURL=userOtp.entity.js.map