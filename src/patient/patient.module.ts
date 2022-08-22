import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { PatientSchema } from 'src/models/patient.schema';

//import { AppointmentSchema } from '../models/appointment.schema';
import { SharedModule } from '../shared/shared.module';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Patient', schema: PatientSchema }]),
    SharedModule,AuthModule
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
