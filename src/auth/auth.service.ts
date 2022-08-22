import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
  }

  async validatePatient(payload: Payload) {
    return await this.userService.findPatientByPayload(payload);
  }

  async validateDoctor(payload: Payload) {
    return await this.userService.findDoctorByPayload(payload);
  }
}
