import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import {constants} from "../utilities/constants";

export const slotSchema = new mongoose.Schema({
  time : {
      type: String,
  },
  isBooked : {
      type: Boolean,
      default: false
  }
})

export const dateSchedule = new mongoose.Schema({
  date : {
      type: String
  },
  slots : [slotSchema]
})
export const DoctorSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId,auto:true },
    username:{ type: String, required: true },
    phone:{ type: String, required: true,unique:true },
    password: { type: String, default: "" },
    gender:
    {type: String,
    enum: [
        constants.GENDER.MALE,
        constants.GENDER.FEMALE
    ]
},
 dates:[dateSchedule],
specialization:{type:String,
enum:[constants.SPECIALIZATION.DENTIST,
    constants.SPECIALIZATION.ENT,
    constants.SPECIALIZATION.NEUROLOGIST,
    constants.SPECIALIZATION.PHYSICIAN,
    constants.SPECIALIZATION.SURGEON
]},
  created: { type: Date, default: Date.now },
});

DoctorSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
