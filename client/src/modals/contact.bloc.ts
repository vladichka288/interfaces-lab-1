import { inject, injectable } from "inversify";
import {
  action,
  computed,
  flow,
  makeObservable,
  observable,
  reaction,
} from "mobx";
import { IBLoC, InitialPropsSymbol } from "../ioc";
import { IContactInput } from "../models/input/contant.input";
import {
  ContactsServiceSymbol,
  IContactService,
} from "../services/contacts.service";
import {
  FormErrors,
  FormFieldName,
  FormValues,
  isValidForm,
  readForm,
  setFormValue,
  validateForm,
} from "../utils/form";
import { ContactModalProps } from "./contact.modal";
import * as yup from "yup";
import { ContactsStoreSymbol, IContactStore } from "../stores/contacts.store";
@injectable()
export class ContactModalBLoC implements IBLoC {
  @inject(InitialPropsSymbol) props!: ContactModalProps;
  @inject(ContactsServiceSymbol)
  contactService!: IContactService;
  @inject(ContactsStoreSymbol)
  contactStore!: IContactStore;
  @observable initialized = false;
  @observable touched: boolean = false;
  @observable formError: string | null = null;
  @observable data: FormValues<IContactInput> = {};
  @observable errors: FormErrors<IContactInput> = {};
  constructor() {
    makeObservable(this);
    reaction(() => this.touched, this.validate);
    reaction(() => this.data, this.validate);
    setImmediate(() => this.initialize());
  }

  @computed get contactToUpdate() {
    return this.contactStore
      .getContacts()
      .find((contact) => contact.uid == this.props.uid);
  }
  @flow *initialize() {
    yield this.contactService.SyncContacts();
    if (this.contactToUpdate) {
      this.data = {
        name: this.contactToUpdate.name,
        numbers: this.contactToUpdate.numbers,
      };
    } else {
      this.data = { name: "", numbers: [""] };
    }

    this.initialized = true;
  }

  onChange = action(<T>(name: FormFieldName, value: T) => {
    setFormValue(this, { name: "data", field: name }, value);
  });

  @action validate = () => {
    if (this.touched) {
      this.errors = validateForm(validationSchema, this.data);
    }
  };

  @flow *onSave() {
    this.touched = true;
    this.formError = null;

    if (!isValidForm(validationSchema, this.data)) {
      return;
    }

    const model = readForm<IContactInput>(validationSchema, this.data);

    try {
      if (this.props.uid) {
        yield this.contactService.UpdateContact({
          ...model,
          uid: this.props.uid,
        });
      } else {
        yield this.contactService.CreateContact(model);
      }
      yield this.contactService.SyncContacts();
      this.props.onClose();
    } catch (err: any) {
      this.formError = err.message;
    } finally {
    }
  }
  addNumberClickedHandler = () => {
    this.data.numbers?.push("");
  };

  deleteContactHandler = async () => {
    if (this.props.uid) {
      await this.contactService.DeleteContact(this.props.uid);
      this.props.onClose();
      await this.contactService.SyncContacts();
    }
  };

  removeNumber = (index: number) => {
    this.data.numbers?.splice(index, 1);
  };
  async onParamsChange(props: ContactModalProps, params: unknown) {
    this.props = props;
  }
}

export const validationSchema = yup.object().shape({
  name: yup.string().required().label("Contact name").max(50),
  numbers: yup
    .array()
    .of(yup.string().required("Phone number is required field")),
});
