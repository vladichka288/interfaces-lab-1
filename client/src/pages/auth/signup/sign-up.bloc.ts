import { inject, injectable } from "inversify";
import { action, flow, makeObservable, observable, reaction } from "mobx";
import { IBLoC } from "../../../ioc";

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
import { Genders, ISignUpInput } from "../../../models/input/sign-up.input";
@injectable()
export class SignUpBLoC implements IBLoC {
  @inject(AuthServiceSymbol) authService!: IAuthService;
  @observable signUpClicked: boolean = false;
  @observable touched: boolean = false;
  @observable formError: string | null = null;
  @observable loading: boolean = false;

  @observable data: FormValues<ISignUpInput> = {};
  @observable errors: FormErrors<ISignUpInput> = {};
  constructor() {
    makeObservable(this);
    reaction(() => this.touched, this.validate);
    reaction(() => this.data, this.validate);
    this.initialize();
  }
  onChange = action(<T>(name: FormFieldName, value: T) => {
    setFormValue(this, { name: "data", field: name }, value);

    this.data = { ...this.data };
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

    const model = readForm<ISignUpInput>(validationSchema, this.data);

    try {
      yield this.authService.SignUp(model);
      this.signupClicked();
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
  username: yup.string().required().min(3).max(100).label("Username"),
  email: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid Email")
    .required()
    .label("Email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(100),
  repeatPassword: yup
    .string()
    .required("Repeat password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(Genders, "Please select gender from proposals"),
  birthdayDate: yup
    .date()
    .required("Birthday date is required")
    .max(new Date(), "Birthday date cannot be in the future"),
});
