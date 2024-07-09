/// <reference types="node" />
import { Repository } from 'typeorm';
import { Holidays } from './entities/holidays.entity';
export declare class HolidaysService {
    private readonly holidaysRepository;
    holidaysService: any;
    leaveRequestRepository: any;
    constructor(holidaysRepository: Repository<Holidays>);
    uploadImage(date: Date, day: string, occasion: string, image: Buffer, req_mail: string): Promise<Holidays>;
    getAllHolidays(): Promise<Holidays[]>;
    getUpcomingHolidays(currentDate: Date): Promise<{
        date: Date;
        day: string;
        occasion: string;
        image: Buffer;
    }[]>;
    deleteHolidays(id: number): Promise<string>;
    getRemainingHolidays(): Promise<any>;
}
