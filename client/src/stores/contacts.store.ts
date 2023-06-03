import { injectable } from "inversify";
import { action, observable } from "mobx";
import { IContact } from "../models/contacts.model";

export interface IContactStore {
  contacts: IContact[];

  setContacts(contacts: IContact[]): void;
  getContacts(): IContact[];
}

export const ContactsStoreSymbol = Symbol.for("IContactStore");

@injectable()
export class ContactStore implements IContactStore {
  @observable contacts: IContact[] = observable([]);

  @action setContacts(contacts: IContact[]) {
    this.contacts.splice(0);
    this.contacts.push(...contacts);
  }
  getContacts(): IContact[] {
    return this.contacts;
  }
}
