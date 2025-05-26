export interface PersonalData {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  dni: string;
  birthDate: string;
}

export interface RegistrationForm {
  username: string;
  password: string;
  personalData: PersonalData;
}