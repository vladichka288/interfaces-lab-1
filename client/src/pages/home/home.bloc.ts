import { inject, injectable } from "inversify";
import { flow, makeObservable, observable } from "mobx";
import { IBLoC } from "../../ioc";

import {
  ContactsServiceSymbol,
  IContactService,
} from "../../services/contacts.service";

@injectable()
export class HomeBLoC implements IBLoC {
  @inject(ContactsServiceSymbol) contactService!: IContactService;
  @observable initialized = false;
  constructor() {
    makeObservable(this);
    setImmediate(() => this.initialize());
  }

  @flow *initialize() {
    this.initialized = true;
  }

  async onParamsChange(props: unknown, params: unknown) {}
}
