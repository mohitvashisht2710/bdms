import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { dateSchedule, DoctorSchema, slotSchema } from 'src/models/doctor.schema';

//import { AppointmentSchema } from '../models/appointment.schema';
import { SharedModule } from '../shared/shared.module';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }]),
    MongooseModule.forFeature([{ name: 'DateSchedule', schema: dateSchedule }]),
    MongooseModule.forFeature([{ name: 'Slot', schema: slotSchema }]),
    SharedModule,AuthModule
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
