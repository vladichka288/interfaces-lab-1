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
import { SigninBLoC } from "./sign-in.bloc";
import "../../../styles/form.css";
import { on } from "events";
import { Input } from "../../../components/form/Input";
export type SigninProps = {};
export const SigninPage = memo<SigninProps>((props) => {
  const bloc = ioc.useBLoC2(SigninBLoC, props);

  const [onFormSubmit] = useFormSubmit(() => bloc.onSave());

  return (
    <Observer>
      {() => (
        <div className="centering-wrapper">
          <Modal>
            <ModalHead label="Login" />
            <ModalBody onSubmit={onFormSubmit} error={bloc.formError}>
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
              <SubmitButton title={"Log in"} />
            </ModalBody>
            <p className="mt-3 custom-footer-link">
              If you don't have an account,{" "}
              <span onClick={bloc.signupClicked} className="custom-link">
                click here
              </span>{" "}
              to create one.
            </p>
            {bloc.signUpClicked && <Navigate to="/signup" />}
            {bloc.isSignedIn && <Navigate to="/posts" />}
          </Modal>
        </div>
      )}
    </Observer>
  );
});
