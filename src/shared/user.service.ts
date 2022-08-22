import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { PatientLoginDTO, PatientRegisterDTO,DoctorLoginDTO,DoctorRegisterDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import { Doctor,Patient } from '../types/user';

@Injectable()
export class UserService {
  constructor(@InjectModel('Patient') private patientModel: Model<Patient>,@InjectModel('Doctor') private doctorModel: Model<Doctor>) {}

  async createPatient(patientDTO: PatientRegisterDTO) {
    const { username } = patientDTO;
    const user = await this.patientModel.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.patientModel(patientDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async createDoctor(doctorDTO: DoctorRegisterDTO) {
    
      const { username } = doctorDTO;
    const user = await this.doctorModel.findOne({ username });
    if (user) {
      throw new HttpException('Doctor already exists', HttpStatus.BAD_REQUEST);
    }

    const createdDoctor = new this.doctorModel(doctorDTO);
    await createdDoctor.save();
    return this.sanitizeUser(createdDoctor);
    
  }


  async findDoctorsList() {
    return await this.doctorModel.find();
  }
  async findPatientsList() {
    return await this.patientModel.find();
  }

  async findPatientByLogin(userDTO: PatientLoginDTO) {
    const { username, password } = userDTO;
    const user = await this.patientModel
      .findOne({ username })
      .select('username password phone gender created ');
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findDoctorByLogin(userDTO: DoctorLoginDTO) {
    const { username, password } = userDTO;
    const user = await this.doctorModel
      .findOne({ username })
      .select('username password phone gender created specialization');
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findPatientByPayload(payload: Payload) {
    const { username } = payload;
    return await this.patientModel.findOne({ username });
  }

  async findDoctorByPayload(payload: any) {
    const { id } = payload;
    return await this.doctorModel.findOne({ _id:id });
  }

  sanitizeUser(user: Doctor|Patient) {
    let sanitized = user.toObject();
   delete sanitized['password'];
    return sanitized;
    // return user.depopulate('password');
  }
}
