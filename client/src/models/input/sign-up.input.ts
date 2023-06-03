export enum Gender {
  male = "male",
  female = "female",
}
export const Genders = [Gender.male, Gender.female];
export type ISignUpInput = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  gender: Gender;
  birthdayDate: Date;
};
