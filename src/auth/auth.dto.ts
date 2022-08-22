
export interface PatientLoginDTO {
  username: string;
  password: string;
}

export interface PatientRegisterDTO {
  username: string;
  password: string;
  phone:string,
  gender:string
}

export interface DoctorLoginDTO {
  username: string;
  password: string;
}

export interface DoctorRegisterDTO {
  username: string;
  password: string;
  phone:string,
  gender:string,
  specialization:string
}