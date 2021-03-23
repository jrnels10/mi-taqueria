export interface RegistrationFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
}

export interface Taqueria {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  timeOpen: Date;
  timeClose: Date;
  status: string;
}
export interface TaqueriaContextData {
  taqueria: Taqueria[];
}
