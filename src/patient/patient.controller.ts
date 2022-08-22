 import { Controller, Get, UseGuards, Post, Body ,Param} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../utilities/user.decorator';
import { Doctor as UserDocument } from '../types/user';
import { PatientService } from './patient.service';
import { DoctorDTO } from './doctor.dto';
import { UserService } from 'src/shared/user.service';

 @Controller('patient')
 export class PatientController {
  constructor(private patientService: PatientService,private userService:UserService) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findDoctorById(@Param('id') id: string) {
    return this.patientService.findPatientByPayload(id);
  }
 }
