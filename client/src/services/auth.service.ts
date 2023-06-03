import { inject, injectable } from "inversify";
import { ISignInInput } from "../models/input/sign-in.input";
import { ISignUpInput } from "../models/input/sign-up.input";
import { ISignInOutput } from "../models/response/sing-in.response";
import { ISignUpOutput } from "../models/response/sing-up.response";
import { AuthStoreSymbol, IAuthStore } from "../stores/auth.store";
import { HTTPServiceSymbol, IHTTPService } from "./http.service";

export const AuthServiceSymbol = Symbol.for("IAuthServiceSymbol");

export interface IAuthService {
  SignIn(input: ISignInInput): Promise<void>;
  SignUp(input: ISignUpInput): Promise<void>;
}

@injectable()
export class AuthService implements IAuthService {
  @inject(HTTPServiceSymbol) httpService!: IHTTPService;
  @inject(AuthStoreSymbol) authStore!: IAuthStore;
  async SignIn(body: ISignInInput): Promise<void> {
    const response = await this.httpService.POST<ISignInOutput>(
      "/auth/signin",
      body
    );
    if (!response.auth || !response.token) {
      throw new Error("Failed To Signin");
    }
    this.authStore.setToken(response.token);
  }
  async SignUp(body: ISignUpInput): Promise<void> {
    const response = await this.httpService.POST<ISignUpOutput>(
      "/auth/signup",
      body
    );
  
    if (!response.success) {
      throw new Error("Failed To Registrate");
    }
  }
}
