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
exports.CreateLeaveTypesAndRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateLeaveTypesAndRequestDto {
}
exports.CreateLeaveTypesAndRequestDto = CreateLeaveTypesAndRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'the type of leave',
        'example': 'full'
    }),
    __metadata("design:type", String)
], CreateLeaveTypesAndRequestDto.prototype, "leave_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The start date of leave',
        example: '2024-04-10'
    }),
    __metadata("design:type", Date)
], CreateLeaveTypesAndRequestDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The end date of leave',
        example: '2024-04-11'
    }),
    __metadata("design:type", Date)
], CreateLeaveTypesAndRequestDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'the reason for leave',
        example: 'health issue'
    }),
    __metadata("design:type", String)
], CreateLeaveTypesAndRequestDto.prototype, "reason", void 0);
//# sourceMappingURL=create-leave_types_and_request.dto.js.map