import { inject, injectable } from "inversify";
import { IContact } from "../models/contacts.model";
import {
  IContactInput,
  IUpdateContactInput,
} from "../models/input/contant.input";
import { ISignInInput } from "../models/input/sign-in.input";
import {
  ISuccessResponse,
  ISuccessActionResponse,
} from "../models/response/success.response";
import { ContactsStoreSymbol, IContactStore } from "../stores/contacts.store";

import { HTTPServiceSymbol, IHTTPService } from "./http.service";

export const ContactsServiceSymbol = Symbol.for("IContactServiceSymbol");

export interface IContactService {
  SyncContacts(): Promise<void>;
  CreateContact(body: IContactInput): Promise<ISuccessResponse>;
  UpdateContact(body: IUpdateContactInput): Promise<ISuccessActionResponse>;
  DeleteContact(uid: string): Promise<ISuccessActionResponse>;
}

@injectable()
export class ContactService implements IContactService {
  @inject(ContactsStoreSymbol) contactStore!: IContactStore;
  @inject(HTTPServiceSymbol) httpService!: IHTTPService;

  async SyncContacts() {
    const response = await this.httpService.GET<IContact[]>("/contacts");
    this.contactStore.setContacts(response);
  }
  async CreateContact(body: IContactInput) {
    const response = await this.httpService.POST<ISuccessResponse>(
      "/contacts/create",
      body
    );
    return response;
  }
  async UpdateContact(body: IUpdateContactInput) {
    const response = await this.httpService.PUT<ISuccessActionResponse>(
      "/contacts/update",
      body
    );
    return response;
  }
  async DeleteContact(uid: string) {
    const response = await this.httpService.DELETE<ISuccessActionResponse>(
      `/contacts/${uid}`
    );
    return response;
  }
}
