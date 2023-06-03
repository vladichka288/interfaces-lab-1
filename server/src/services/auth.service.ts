import { injectable } from "inversify";

import { SignInInput } from "../dto/sign-in.dto";
import { SignUpInput } from "../dto/sign-up.dto";
import { BadRequestError } from "../models/errors";
import { UserDocument, UserModel } from "../models/user";

export const AuthServiceSymbol = Symbol.for("AuthService");
export interface IAuthService {
  signIn(body: SignInInput): Promise<UserDocument | null>;
  signUp(body: SignUpInput): Promise<UserDocument | null>;
}
@injectable()
export class AuthService implements IAuthService {
  async signIn(body: SignInInput) {
    const user = await UserModel.findOne({
      email: body.email,
      password: body.password,
    });

    if (!user) {
      return null;
    }
    return user;
  }
  async signUp(body: SignUpInput) {
    const user = await UserModel.findOne({ email: body.email });
    if (user) {
      return null;
    }

    const createdUser = await UserModel.create(body);

    return createdUser;
  }
}
