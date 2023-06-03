import { inject, injectable } from "inversify";
import { flow, makeObservable, observable } from "mobx";
import { Navigate, useNavigate } from "react-router-dom";
import { IBLoC } from "../../ioc";
import { AuthStoreSymbol, IAuthStore } from "../../stores/auth.store";

@injectable()
export class NavbarBLoC implements IBLoC {
  @inject(AuthStoreSymbol) authStore!: IAuthStore;
  @observable initialized = false;
  @observable url: string | null = window.location.pathname;
  @observable navigationLink: string | null = null;

  @observable links: { label: string; navigateTo: string }[] = [
    { label: "Home", navigateTo: "/home" },
    { label: "Contacts", navigateTo: "/contacts" },
  ];

  constructor() {
    makeObservable(this);
    setImmediate(() => this.initialize());
  }

  @flow *initialize() {
    this.initialized = true;
  }

  linkClicked(navigateTo: string) {
    this.navigationLink = navigateTo;
    this.url = null;
  }
  onSignOutClicked = () => {
    this.authStore.setToken(null);
  };

  async onParamsChange(props: unknown, params: unknown) {}
}
