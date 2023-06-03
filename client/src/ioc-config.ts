// Copyright 2021 Green Badger LLC

import { Container } from "inversify";
import { History } from "history";

import { HistorySymbol } from "./history";
import {
  HTTPService,
  HTTPServiceSymbol,
  IHTTPService,
} from "./services/http.service";
import {
  AuthService,
  AuthServiceSymbol,
  IAuthService,
} from "./services/auth.service";
import {
  IPersistance,
  Persistance,
  PersistanceSymbol,
} from "./utils/persistance";
import { AuthStore, AuthStoreSymbol, IAuthStore } from "./stores/auth.store";
import {
  ContactService,
  ContactsServiceSymbol,
  IContactService,
} from "./services/contacts.service";
import { ContactsStoreSymbol, ContactStore, IContactStore } from "./stores/contacts.store";

function bindHistory(container: Container, history: History) {
  container.rebind<History>(HistorySymbol).toConstantValue(history);
}

function configure(container: Container) {
  container.bind<History | null>(HistorySymbol).toConstantValue(null);
  container.bind<IHTTPService>(HTTPServiceSymbol).to(HTTPService);
  container.bind<IAuthService>(AuthServiceSymbol).to(AuthService);

  container.bind<IAuthStore>(AuthStoreSymbol).to(AuthStore).inSingletonScope();
  container.bind<IContactStore>(ContactsStoreSymbol).to(ContactStore).inSingletonScope();
  const sessionPersistance = Persistance.provide(sessionStorage);
  container
    .bind<IPersistance>(PersistanceSymbol)
    .toConstantValue(sessionPersistance)
    .whenTargetNamed("session");

  container.bind<IContactService>(ContactsServiceSymbol).to(ContactService);
}

const iocConfig = { bindHistory, configure };
export default iocConfig;
