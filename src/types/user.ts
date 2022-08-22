import { Document } from 'mongoose';


export interface Doctor extends Document {
  _id:string;
  username: string;
  password: string;
  phone: string;
  gender:string;
  dates:DateSchedule[];
  specialization:string;
  created: Date;
}

export interface Slot extends Document {
  time:string;
  isBooked:boolean;
}

export interface DateSchedule extends Document {
  date:string;
  slots:Slot[];
}

export interface Patient extends Document {
  _id:string;
  username: string;
  password: string;
  phone: string;
  gender:string;
  created: Date;
}
