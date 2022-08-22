import * as mongoose from 'mongoose';


export const prescription = new mongoose.Schema({
  given : {
      type : Boolean,
      default : false
  },
  title : {
      type : String,
      default : ""
  },
  details : {
      type : String,
      default : ""
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

export const appointmentSchema = new mongoose.Schema({
  doctorId : {
      required: true,
      type: String
  },
  dateId : {
      required: true,
      type: String
  },
  slotId : {
      required: true,
      type: String
  },
  patientId : {
      required: true,
      type: String
  },
  date : {
      type: String
  },
  slotTime : {
      type: String
  },
  doctorName : {
      type : String
  },
  doctorEmail : {
      type : String
  },
  patientName : {
      type : String
  },
  sendBirdLink : {
      type : String
  },
  prescription : prescription,
  created: {
    type: Date,
    default: Date.now,
  },
});
