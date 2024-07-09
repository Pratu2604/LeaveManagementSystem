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
exports.HolidaysController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const holidays_service_1 = require("./holidays.service");
const swagger_1 = require("@nestjs/swagger");
const holidays_entity_1 = require("./entities/holidays.entity");
const JwtAuthGuard_1 = require("../auth/guards/JwtAuthGuard");
let HolidaysController = class HolidaysController {
    constructor(holidaysService) {
        this.holidaysService = holidaysService;
    }
    async uploadImage(file, body, req) {
        const inputData = body.data1;
        const createHolidayDto = JSON.parse(inputData);
        const req_mail = req.user.user.email;
        const newHoliday = await this.holidaysService.uploadImage(createHolidayDto.date, createHolidayDto.day, createHolidayDto.occasion, file.buffer, req_mail);
        return {
            message: 'Image uploaded for holiday successfully',
            holiday: newHoliday,
            req_mail,
        };
    }
    async getAllHolidays() {
        const holidays = await this.holidaysService.getAllHolidays();
        return {
            message: 'All holidays retrieved successfully',
            holidays: holidays,
        };
    }
    async getUpcomingHolidays() {
        const currentDate = new Date();
        const upcomingHolidays = await this.holidaysService.getUpcomingHolidays(currentDate);
        return {
            message: 'Upcoming holidays retrieved successfully',
            holidays: upcomingHolidays,
        };
    }
    async deleteEmployee(id) {
        try {
            await this.holidaysService.deleteHolidays(id);
            return 'Holiday Deleted Successfully';
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getRemainingHolidays() {
        try {
            const remainingHolidays = await this.holidaysService.getRemainingHolidays();
            return { remainingHolidays };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.HolidaysController = HolidaysController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiBody)({
        type: holidays_entity_1.Holidays
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'create holiday object ',
        type: holidays_entity_1.Holidays
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiBody)({
        description: 'Image upload',
        schema: {
            type: 'object',
            properties: {
                data1: {
                    type: 'object',
                    properties: {
                        date: {
                            type: 'string',
                        },
                        day: {
                            type: 'string',
                        },
                        occasion: {
                            type: 'string',
                        },
                    },
                },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get all Holidays',
        type: [holidays_entity_1.Holidays]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "getAllHolidays", null);
__decorate([
    (0, common_1.Get)('upcoming'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get upcoming Holidays',
        type: [holidays_entity_1.Holidays],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "getUpcomingHolidays", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Employee with given ID will be deleted as response'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "deleteEmployee", null);
__decorate([
    (0, common_1.Get)('remaining-holidays'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get remaining holidays',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "getRemainingHolidays", null);
exports.HolidaysController = HolidaysController = __decorate([
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiTags)('holidays'),
    (0, common_1.Controller)('holidays'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [holidays_service_1.HolidaysService])
], HolidaysController);
//# sourceMappingURL=holidays.controller.js.map