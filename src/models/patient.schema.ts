import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import {constants} from "../utilities/constants";

export const PatientSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId ,auto:true},
    username:{ type: String, required: true },
    phone:{ type: String, required: true,unique:true },
    password: { type: String,required:true,select:false},
    gender:
    {type: String,
    enum: [
        constants.GENDER.MALE,
        constants.GENDER.FEMALE
    ]
},
  created: { type: Date, default: Date.now },
});

PatientSchema.pre('save', async function(next: mongoose.HookNextFunction) {
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
