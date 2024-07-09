import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
  Body,
  UseGuards,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UploadedFiles,
  Put,
  Request,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { HolidaysService } from './holidays.service';
// import { MulterFile } from 'multer';
import { Multer, diskStorage } from 'multer';
import { CreateHolidaysDto } from './dto/create-holidays.dto';
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Holidays } from './entities/holidays.entity';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';

@ApiBearerAuth("JWT-auth")
@ApiTags('holidays')
@Controller('holidays')
@UseGuards(JwtAuthGuard)
export class HolidaysController {
  imageService: any;
  constructor(private readonly holidaysService: HolidaysService) { }


  @Post('upload')
  @ApiBody({
    type: Holidays
  })
  @ApiCreatedResponse({
    description: 'create holiday object ',
    type: Holidays
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
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
  })
  async uploadImage(@UploadedFile() file, @Body() body: any,
    @Request() req,) {

    const inputData = body.data1;
    const createHolidayDto: CreateHolidaysDto = JSON.parse(inputData);

    const req_mail = req.user.user.email;
    const newHoliday = await this.holidaysService.uploadImage(
      createHolidayDto.date,
      createHolidayDto.day,
      createHolidayDto.occasion,
      file.buffer,
      req_mail,

    );

    return {
      message: 'Image uploaded for holiday successfully',
      holiday: newHoliday,
      req_mail,
    };
  }


  @Get()
  @ApiOkResponse({
    description: 'Get all Holidays',
    type: [Holidays]
  })
  async getAllHolidays() {
    const holidays = await this.holidaysService.getAllHolidays();
    return {
      message: 'All holidays retrieved successfully',
      holidays: holidays,
    };
  }


  @Get('upcoming')
  @ApiOkResponse({
    description: 'Get upcoming Holidays',
    type: [Holidays],
  })
  async getUpcomingHolidays() {
    const currentDate = new Date();
    const upcomingHolidays = await this.holidaysService.getUpcomingHolidays(currentDate);
    return {
      message: 'Upcoming holidays retrieved successfully',
      holidays: upcomingHolidays,
    };
  }


  @Delete(':id')
  @ApiOkResponse({
    description: 'Employee with given ID will be deleted as response'

  })
  async deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.holidaysService.deleteHolidays(id);
      return 'Holiday Deleted Successfully'
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('remaining-holidays')
  @ApiOkResponse({
    description: 'Get remaining holidays',
  })
  async getRemainingHolidays(): Promise<{ remainingHolidays: number }> {
    try {
      const remainingHolidays = await this.holidaysService.getRemainingHolidays();
      return { remainingHolidays };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
