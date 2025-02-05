export type AdminRegisterUsers = {
  _id: string;
  fullname: string;
  tag: number;
  email: string;
  qrcodestring: string;
  medicalData: MedicalData[];
};

export type MedicalData = {
  name: string,
  birthday: string,
  address: string,
  country: string,
  city: string,
  zipcode: string,
  ethnicity: string,
  gender: string,
  phone: string,
  height: string,
  weight: string,
  importantinfo: string,
  medicalhistory: string,
  medication: string,
  allergie: string,
  phone2: string,
  name2: string,
  relationship: string,
  dnr: string,
};
