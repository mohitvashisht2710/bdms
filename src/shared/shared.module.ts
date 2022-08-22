import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { PatientSchema } from '../models/patient.schema';
import { DoctorSchema } from 'src/models/doctor.schema';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Patient', schema: PatientSchema }]),
  MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }])],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [UserService],
})
export class SharedModule {}
