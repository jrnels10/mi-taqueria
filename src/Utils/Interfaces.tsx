export interface RegistrationUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // userType: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  // userType: string;
}

export interface Taqueria {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  status: string;
  photos: IPhotos[];
}

export interface IPhotos {
  fileUrl: string;
  fileName: string;
}
export interface ISchedule {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}
export interface TaqueriaContextData {
  taqueria: Taqueria[];
}
