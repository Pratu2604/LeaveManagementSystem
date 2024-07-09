/// <reference types="node" />
import { HolidaysService } from './holidays.service';
import { Holidays } from './entities/holidays.entity';
export declare class HolidaysController {
    private readonly holidaysService;
    imageService: any;
    constructor(holidaysService: HolidaysService);
    uploadImage(file: any, body: any, req: any): Promise<{
        message: string;
        holiday: Holidays;
        req_mail: any;
    }>;
    getAllHolidays(): Promise<{
        message: string;
        holidays: Holidays[];
    }>;
    getUpcomingHolidays(): Promise<{
        message: string;
        holidays: {
            date: Date;
            day: string;
            occasion: string;
            image: Buffer;
        }[];
    }>;
    deleteEmployee(id: number): Promise<string>;
    getRemainingHolidays(): Promise<{
        remainingHolidays: number;
    }>;
}
