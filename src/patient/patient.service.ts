 import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
 import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PatientLoginDTO, PatientRegisterDTO,DoctorLoginDTO,DoctorRegisterDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import { Doctor,Patient } from '../types/user';

 @Injectable()
 export class PatientService {
    constructor(@InjectModel('Patient') private patientModel: Model<Patient>,@InjectModel('Doctor') private doctorModel: Model<Doctor>) {}

  async findPatientByPayload(payload: any) {
    const { username } = payload;
    return await this.patientModel.findOne({ username });
  }

 

  sanitizeUser(user: Doctor|Patient) {
    let sanitized = user.toObject();
   delete sanitized['password'];
    return sanitized;
    // return user.depopulate('password');
  }
 }
