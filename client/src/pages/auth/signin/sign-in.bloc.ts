import { inject, injectable } from "inversify";
import {
  action,
  computed,
  flow,
  makeObservable,
  observable,
  reaction,
} from "mobx";
import { IBLoC } from "../../../ioc";
import { ISignInInput } from "../../../models/input/sign-in.input";
import {
  FormErrors,
  FormFieldName,
  FormValues,
  isValidForm,
  readForm,
  setFormValue,
  validateForm,
} from "../../../utils/form";
import * as yup from "yup";
import {
  AuthService,
  AuthServiceSymbol,
  IAuthService,
} from "../../../services/auth.service";
import { Navigate, redirect } from "react-router-dom";
import { AuthStoreSymbol, IAuthStore } from "../../../stores/auth.store";
@injectable()
export class SigninBLoC implements IBLoC {
  @inject(AuthServiceSymbol) authService!: IAuthService;
  @inject(AuthStoreSymbol) authStore!: IAuthStore;

  @observable touched: boolean = false;
  @observable formError: string | null = null;
  @observable loading: boolean = false;
  @observable signUpClicked: boolean = false;
  @observable data: FormValues<ISignInInput> = {};
  @observable errors: FormErrors<ISignInInput> = {};

  @computed get isSignedIn() {
    return this.authStore.token ? true : false;
  }
  constructor() {
    makeObservable(this);
    reaction(() => this.touched, this.validate);
    reaction(() => this.data, this.validate);
    this.initialize();
  }
  onChange = action(<T>(name: FormFieldName, value: T) => {
    setFormValue(this, { name: "data", field: name }, value);
  });

  signupClicked = () => {
    this.signUpClicked = true;
  };
  @action validate = () => {
    if (this.touched) {
      this.errors = validateForm(validationSchema, this.data);
    }
  };

  @flow *onSave() {
    this.touched = true;
    this.formError = null;
    this.loading = true;

    if (!isValidForm(validationSchema, this.data)) {
      this.loading = false;
      return;
    }

    const model = readForm<ISignInInput>(validationSchema, this.data);

    try {
      yield this.authService.SignIn(model);
    } catch (err: any) {
  
      this.formError = err.message;
    } finally {
      this.loading = false;
    }
  }
  @flow *initialize() {}

  async onParamsChange(props: unknown, params: unknown) {}
}

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid Email")
    .required()
    .label("Email"),
  password: yup.string().min(8).required().label("Password"),
});
