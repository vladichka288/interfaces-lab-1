import { inject, injectable } from "inversify";
import {
  computed,
  flow,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import { IBLoC } from "../../ioc";
import { IContact } from "../../models/contacts.model";

import {
  ContactsServiceSymbol,
  IContactService,
} from "../../services/contacts.service";
import {
  ContactsStoreSymbol,
  IContactStore,
} from "../../stores/contacts.store";

@injectable()
export class ContactsBLoC implements IBLoC {
  @inject(ContactsServiceSymbol) contactService!: IContactService;
  @inject(ContactsStoreSymbol) contactsStore!: IContactStore;

  constructor() {
    makeObservable(this);
    setImmediate(() => this.initialize());
  }
  @observable initialized = false;

  @observable clickedContact: string | undefined;
  @observable newContact: boolean | undefined;
  @computed get contacts(): IContact[] {
    const constacts = this.contactsStore.contacts;
    return constacts;
  }
  onModalClose = () => {
    this.clickedContact = undefined;
    this.newContact = undefined;
  };

  @flow *initialize() {
    try {
      makeObservable(this);
      yield this.contactService.SyncContacts();
    } catch (err) {
      // ingore error
    }
  }

  async onParamsChange(props: unknown, params: unknown) {}
}
