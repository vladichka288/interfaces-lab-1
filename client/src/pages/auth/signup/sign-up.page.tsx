import { Observer } from "mobx-react-lite";
import { memo } from "react";
import { Navigate, redirect } from "react-router-dom";
import { FieldVertical } from "../../../components/form/field";
import { SubmitButton } from "../../../components/form/submit-button.component";
import { Modal } from "../../../components/modal/Modal";
import {
  ModalBody,
  ModalFoot,
  ModalHead,
} from "../../../components/modal/ModalStruct";
import ioc from "../../../ioc";
import { useFormSubmit } from "../../../utils/form";
import { SignUpBLoC } from "./sign-up.bloc";
import "../../../styles/form.css";
import { on } from "events";
import { Input, InputDate } from "../../../components/form/Input";
import { CheckBox } from "../../../components/form/checkbox";
import { Gender } from "../../../models/input/sign-up.input";
export type SignupProps = {};
export const SignupPage = memo<SignupProps>((props) => {
  const bloc = ioc.useBLoC2(SignUpBLoC, props);

  const [onFormSubmit] = useFormSubmit(() => bloc.onSave());

  return (
    <Observer>
      {() => (
        <div className="centering-wrapper">
          <Modal>
            <ModalHead label="Registration" />
            <ModalBody onSubmit={onFormSubmit} error={bloc.formError}>
              <FieldVertical label="Username" error={bloc.errors.username}>
                <Input
                  name="username"
                  placeholder="Enter Username"
                  type="text"
                  value={bloc.data.username}
                  onChange={bloc.onChange}
                  error={bloc.errors.username}
                />
              </FieldVertical>
              <FieldVertical label="Login" error={bloc.errors.email}>
                <Input
                  name="email"
                  placeholder="Enter Login"
                  type="email"
                  value={bloc.data.email}
                  onChange={bloc.onChange}
                  error={bloc.errors.email}
                />
              </FieldVertical>
              <FieldVertical label="Password" error={bloc?.errors?.password}>
                <Input
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  value={bloc.data.password}
                  onChange={bloc.onChange}
                  error={bloc?.errors?.password}
                />
              </FieldVertical>
              <FieldVertical
                label="Repeat Password"
                error={bloc?.errors?.repeatPassword}
              >
                <Input
                  name="repeatPassword"
                  placeholder="Repeat Password"
                  type="password"
                  value={bloc.data.repeatPassword}
                  onChange={bloc.onChange}
                  error={bloc?.errors?.repeatPassword}
                />
              </FieldVertical>
              <FieldVertical label="Gender" error={bloc?.errors?.gender}>
                <CheckBox
                  values={GenderValues}
                  value={bloc.data.gender}
                  onChange={bloc.onChange}
                  name="gender"
                  error={bloc.errors?.gender}
                />
              </FieldVertical>
              <FieldVertical
                label="Birthday Date"
                error={bloc?.errors?.birthdayDate}
              >
                <InputDate
                  placeholder="Select Date"
                  value={bloc.data.birthdayDate}
                  onChange={bloc.onChange}
                  name="birthdayDate"
                  error={bloc.errors?.birthdayDate}
                />
              </FieldVertical>

              <SubmitButton title={"Create my account"} />
            </ModalBody>
            <p className="mt-3 custom-footer-link">
              If you already have an account?{" "}
              <span className="custom-link" onClick={bloc.signupClicked}>
                Click here
              </span>{" "}
              to sign in.
            </p>
          </Modal>
          {bloc.signUpClicked && <Navigate to="/signin" />}
        </div>
      )}
    </Observer>
  );
});

export const GenderValues = [
  { label: "Male", value: Gender.male },
  { label: "Female", value: Gender.female },
];
