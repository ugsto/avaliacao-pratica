import {Schema, model} from 'mongoose';

export const studentSchema = new Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birthDate: {type: Date, required: true},
  registrationNumber: {type: Number, required: true},
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Student = model('Student', studentSchema);
