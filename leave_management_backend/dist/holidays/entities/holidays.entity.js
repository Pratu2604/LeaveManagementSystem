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
exports.Holidays = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Holidays = class Holidays {
};
exports.Holidays = Holidays;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'id ',
        example: '1'
    }),
    __metadata("design:type", Number)
], Holidays.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    (0, swagger_1.ApiProperty)({
        description: 'occasion date',
        example: '2024-01-01'
    }),
    __metadata("design:type", Date)
], Holidays.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)({
        description: 'occasion day',
        example: 'monday'
    }),
    __metadata("design:type", String)
], Holidays.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)({
        description: 'occasion name',
        example: 'New Year'
    }),
    __metadata("design:type", String)
], Holidays.prototype, "occasion", void 0);
__decorate([
    (0, typeorm_1.Column)('longblob', { nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'occasion image'
    }),
    __metadata("design:type", Buffer)
], Holidays.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    (0, swagger_1.ApiProperty)({
        description: 'When holiday was Created'
    }),
    __metadata("design:type", Date)
], Holidays.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    (0, swagger_1.ApiProperty)({
        description: 'Holiday created by'
    }),
    __metadata("design:type", String)
], Holidays.prototype, "created_by", void 0);
exports.Holidays = Holidays = __decorate([
    (0, typeorm_1.Entity)('holidays')
], Holidays);
//# sourceMappingURL=holidays.entity.js.map