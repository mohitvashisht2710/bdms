import { Body, Controller, Post, Get } from '@nestjs/common';

import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';
import { PatientLoginDTO, PatientRegisterDTO,DoctorLoginDTO,DoctorRegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('patient/login')
  async patientLogin(@Body() userDTO: PatientLoginDTO) {
    const user = await this.userService.findPatientByLogin(userDTO);
    const payload: Payload = {
      username: user.username,
      phone:user.phone
    };
    const token = await this.authService.signPayload(payload);
    return { data:user, token };
  }
  @Post('doctor/login')
  async doctorLogin(@Body() userDTO: DoctorLoginDTO) {
    const user = await this.userService.findDoctorByLogin(userDTO);
    const payload: Payload = {
      username: user.username,
      phone:user.phone
    };
    const token = await this.authService.signPayload(payload);
    return { data:user, token };
  }

  @Post('patient/register')
  async patientRegister(@Body() userDTO: PatientRegisterDTO) {
    const user = await this.userService.createPatient(userDTO);
    const payload: Payload = {
      username: user.username,
      phone:user.phone
    };
    const token = await this.authService.signPayload(payload);
    return { data:user, token };
  }

  @Post('doctor/register')
  async doctorRegister(@Body() userDTO: DoctorRegisterDTO) {
    const user = await this.userService.createDoctor(userDTO);
    const payload: Payload = {
      username: user.username,
      phone:user.phone
    };
    const token = await this.authService.signPayload(payload);
    return { data:user, token };
  }
}
