import { Observer } from "mobx-react-lite";
import { memo } from "react";
import { FieldVertical } from "../components/form/field";
import { Input } from "../components/form/Input";
import { SubmitButton } from "../components/form/submit-button.component";
import { Modal } from "../components/modal/Modal";
import { ModalBody, ModalHead } from "../components/modal/ModalStruct";
import ioc from "../ioc";
import { ContactModalBLoC } from "./contact.bloc";
import "../styles/contact-modal.css";
import { ModalBackground } from "../components/form/modal-backgroudn.component";
import { useFormSubmit } from "../utils/form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
export type ContactModalProps = {
  onClose: () => void;
  uid?: string;
  new?: boolean;
};
type Tagged<A, T> = A & { __tag?: T };
type E164Number = Tagged<string, "E164Number">;
export const ContactModal = memo((props: ContactModalProps) => {
  const bloc = ioc.useBLoC2(ContactModalBLoC, props);
  const [onFormSubmit] = useFormSubmit(() => bloc.onSave());
  return (
    <Observer>
      {() => {
        return (
          <ModalBackground onBackgroundClick={props.onClose}>
            <div
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <Modal className="min-500-px">
                <div className="form-group mb-2 full-width modal-head-with-close-button-wrapper ">
                  <ModalHead
                    label={props.uid ? "Update Contact" : "+ Add Contact"}
                  />
                  <div
                    className="close-button modal-close-button"
                    onClick={props.onClose}
                  >
                    {"\u2715"}
                  </div>
                </div>
                <ModalBody onSubmit={onFormSubmit} error={bloc.formError}>
                  <FieldVertical label="Contact name" error={bloc.errors.name}>
                    <Input
                      name="name"
                      placeholder="Enter contact name"
                      type="text"
                      value={bloc.data.name}
                      onChange={bloc.onChange}
                      error={bloc.errors.name}
                    />
                  </FieldVertical>
                  <div className="form-group mb-2 full-width">
                    {<label>Contact Numbers</label>}
                    {(bloc.data.numbers ?? []).map((value, index) => (
                      <FieldVertical error={bloc.errors.numbers?.[index]}>
                        <PhoneInput
                          className={`form-control custom-input ${
                            bloc.errors.numbers?.[index] ? "red-background" : ""
                          } mb-2`}
                          placeholder="Enter phone number"
                          value={value as E164Number}
                          onChange={(value) =>
                            bloc.onChange(
                              { name: `numbers`, index: index },
                              value
                            )
                          }
                        />

                        {index != 0 && (
                          <div
                            className="close-button"
                            onClick={() => bloc.removeNumber(index)}
                          >
                            {"\u2715"}
                          </div>
                        )}
                      </FieldVertical>
                    ))}
                  </div>

                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      bloc.addNumberClickedHandler();
                    }}
                    className="add-number-button"
                  >
                    + Add Number
                  </button>

                  <SubmitButton title={props.uid ? "Update" : "Create"} />
                  {props.uid && (
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        bloc.deleteContactHandler();
                      }}
                      className="delete-contact-button"
                    >
                      Delete
                    </button>
                  )}
                </ModalBody>
              </Modal>
            </div>
          </ModalBackground>
        );
      }}
    </Observer>
  );
});
