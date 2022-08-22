 import { Controller, Get, UseGuards, Post, Body ,Param} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../utilities/user.decorator';
import { Doctor as UserDocument } from '../types/user';
import { DoctorService } from './doctor.service';
import { DoctorDTO } from './doctor.dto';
import { UserService } from 'src/shared/user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

 @Controller('doctor')
 export class DoctorController {
  constructor(private doctorService: DoctorService,private userService:UserService) {}

  @Get('list')
  @UseGuards(JwtAuthGuard)
  listDoctor() {
    return this.doctorService.findDoctorsList();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  createOrder(@Param('id') id: string) {
    return this.doctorService.findDoctorByPayload(id);
  }

  @Post('get-slots')
  getDoctorSlots(@Body() payload:any){
    return this.doctorService.createDate(payload.date,payload.doctorId);
  }
 }
