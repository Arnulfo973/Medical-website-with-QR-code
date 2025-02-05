import mongoose, { Schema, Document } from 'mongoose';

const medicalDataSchema: Schema = new Schema(
  {
    name: { type: String, default: "none" },
    birthday: { type: String, default: "none" },
    address: { type: String, default: "none" },
    country: { type: String, default: "none" },
    city: { type: String, default: "none" },
    zipcode: { type: String, default: "none" },
    ethnicity: { type: String, default: "none" },
    gender: { type: String, default: "none" },
    phone: { type: String, default: "none" },
    height: { type: String, default: "none" },
    weight: { type: String, default: "none" },
    importantinfo: { type: String, default: "none" },
    medicalhistory: { type: String, default: "none" },
    medication: { type: String, default: "none" },
    allergie: { type: String, default: "none" },
    phone2: { type: String, default: "none" },
    name2: { type: String, default: "none" },
    relationship: { type: String, default: "none" },
    dnr: { type: String, default: "none" },
  },
  { _id: false }
);

export interface IUser extends Document {
  fullname: string;
  lastname: string;
  tag: number;
  email: string;
  password: string;
  token: string;
  qrcodestring: string;
  createdAt: Date;
  medicaldata: Array<typeof medicalDataSchema>;
}

const userSchema: Schema = new Schema({
  fullname: { type: String, required: true },
  tag: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: {type: String },
  qrcodestring: { type: String, unique: true,},
  createdAt: { type: Date, default: Date.now },
  medicaldata: [medicalDataSchema],
});


const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
