import { Gender } from "./sign-up.input";

export type ISignInInput = {
  email: string;
  password: string;
};

export type ISignUpInput = {
  username: string;
  gender: Gender;
  email: string;
  password: string;
  repeatPassword: string;
  birthdayDate: Date;
};
