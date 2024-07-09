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
exports.CreateHolidaysDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateHolidaysDto {
}
exports.CreateHolidaysDto = CreateHolidaysDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'occasion date',
        example: '2024-01-01'
    }),
    __metadata("design:type", Date)
], CreateHolidaysDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'day of occasion',
        example: 'monday'
    }),
    __metadata("design:type", String)
], CreateHolidaysDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'occasion name',
        example: 'New Year'
    }),
    __metadata("design:type", String)
], CreateHolidaysDto.prototype, "occasion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'occasion image',
        example: 'example.jpg'
    }),
    __metadata("design:type", Object)
], CreateHolidaysDto.prototype, "file", void 0);
//# sourceMappingURL=create-holidays.dto.js.map