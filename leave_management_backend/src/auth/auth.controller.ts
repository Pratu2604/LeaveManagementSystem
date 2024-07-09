import { Controller, Get, HttpException, HttpStatus, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './guards/GoogleAuth.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RefreshJwtAuthGuard } from './guards/Refresh.gurad';



@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService:AuthService,
    ){ }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleAuth(@Req() req) {} 


  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    try {
     return res.redirect(
                `http://localhost:3000/Employee?accessToken=${req?.user?.accessToken}&refreshToken=${req?.user?.refreshToken}&jwtToken=${req?.user?.jwtToken}`
              );
    } catch (error) {
      console.error('Error in googleAuthRedirect:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Get('google/redirect')
  // @UseGuards(GoogleAuthGuard)
  // async googleAuthRedirect(@Req() req, @Res() res) {
  //   try {
  //     return this.authService.googleLogin(req,res);
  //   } catch (error) {
  //     console.error('Error in googleAuthRedirect:', error);
  //     throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }


  @Get('status')
  async user(@Req() request:Request){
    console.log(request.user);
    if(request.user){
        return {msg:'Authenticated'};
    }
    else{
        return{msg:'Not AUthenticated'}
    }
  }


  @Post('refresh-token')
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(@Req() req, @Res() res) {
    try {
      const { refreshToken } = req.body;
      console.log('Received refresh token:', { refreshToken });
      const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
            return({ accessToken: newAccessToken });
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  }
}









  






// import { AuthService } from './auth.service';
// import { AuthPayloadDto } from './dto/auth.dto';
// import { AuthGuard } from './guards/auth.guard';
// import { ResetPasswordDto } from './dto/reset-password.dto';
// import {
//     Body,
//     Controller,
//     Get,
//     HttpCode,
//     HttpException,
//     HttpStatus,
//     Param,
//     Post,
//     Req,
//     Request,
//     Res,
//     UseGuards
// } from '@nestjs/common';
// import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

// @ApiTags('Authentication')
// @Controller('auth')
// export class AuthController {

//     constructor(private readonly authService: AuthService) { }

//     @HttpCode(HttpStatus.OK)
//     @Post('login')
//     @ApiCreatedResponse({
//         description:'Get Authentication Token'
//     })
//     login(@Body() authPayload: AuthPayloadDto) {
//         const token = this.authService.validateUser(authPayload);
//         if (!token) throw new HttpException('Invalid Credentials', 401);
//         return token;
//     }

    
// @Post('forgotpassword')
// async forgotPassword(@Body('email') email: string) {
//     try {
//         const result = await this.authService.forgotPassword(email);
//         return result;
//     } catch (error) {
        
//         return { error: error.message };
//     }
// }

// @Post('reset-password')
//     async resetPasswordWithOTP(@Body() resetPasswordDto: ResetPasswordDto) {
//         try {
//             const { email, otp, newPassword, confirmPassword } = resetPasswordDto;
//             await this.authService.resetPasswordWithOTP(email, otp, newPassword, confirmPassword);
//             return { message: 'Password reset successfully' };
//         } catch (error) {
//             return { error: error.message };
//         }
//     }

// // @Post('reset-password')
// // async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
// //     try {
// //         await this.authService.resetPassword(resetPasswordDto.email, resetPasswordDto.newPassword, resetPasswordDto.confirmPassword);
// //         return { message: 'Password reset successfully' };
// //     } catch (error) {
// //         return { error: error.message };
// //     }
// // }

// // @Post('verify-otp')
// // async verifyOTP(@Body() resetPasswordDto: ResetPasswordDto) {
// //     try {
// //         await this.authService.verifyOTP(resetPasswordDto.email, resetPasswordDto.otp);
// //         return { message: 'OTP verified successfully' };
// //     } catch (error) {
// //         return { error: error.message };
// //     }
// // }






