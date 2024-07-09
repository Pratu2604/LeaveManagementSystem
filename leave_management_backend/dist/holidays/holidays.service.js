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
exports.HolidaysService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const holidays_entity_1 = require("./entities/holidays.entity");
let HolidaysService = class HolidaysService {
    constructor(holidaysRepository) {
        this.holidaysRepository = holidaysRepository;
    }
    async uploadImage(date, day, occasion, image, req_mail) {
        const newHoliday = this.holidaysRepository.create({
            date: date,
            day: day,
            occasion: occasion,
            image: image,
        });
        console.log("newHoliday...........", newHoliday);
        newHoliday.created_by = req_mail;
        return await this.holidaysRepository.save(newHoliday);
    }
    async getAllHolidays() {
        return await this.holidaysRepository.find();
    }
    async getUpcomingHolidays(currentDate) {
        try {
            const upcomingHolidays = await this.holidaysRepository
                .createQueryBuilder('holiday')
                .select(['holiday.date', 'holiday.day', 'holiday.occasion', 'holiday.image'])
                .where('holiday.date >= :currentDate', { currentDate })
                .orderBy('holiday.date', 'ASC')
                .getRawMany();
            return upcomingHolidays;
        }
        catch (error) {
            throw new Error('Failed to fetch upcoming holidays');
        }
    }
    async deleteHolidays(id) {
        const holiday = await this.holidaysRepository.findOneBy({ id });
        if (!holiday) {
            throw new common_1.NotFoundException('Holiday not found.');
        }
        await this.holidaysRepository.remove(holiday);
        return 'Holoday deleted successfully.';
    }
    async getRemainingHolidays() {
        try {
            const currentDate = new Date();
            const totalHolidays = await this.holidaysRepository.count();
            const holidaysUntilCurrentDate = await this.holidaysRepository.count({
                where: {
                    date: (0, typeorm_2.LessThanOrEqual)(currentDate),
                },
            });
            const remainingHolidays = totalHolidays - holidaysUntilCurrentDate;
            return { remainingHolidays, totalHolidays };
        }
        catch (error) {
            throw new Error('Failed to calculate remaining holidays');
        }
    }
};
exports.HolidaysService = HolidaysService;
exports.HolidaysService = HolidaysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(holidays_entity_1.Holidays)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HolidaysService);
//# sourceMappingURL=holidays.service.js.map