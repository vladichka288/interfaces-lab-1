import { inject, injectable } from "inversify";
import { computed, flow, makeObservable, observable } from "mobx";
import { IBLoC } from "./ioc";
import { AuthStoreSymbol, IAuthStore } from "./stores/auth.store";

@injectable()
export class AppBLoC implements IBLoC {
  @inject(AuthStoreSymbol) authStore!: IAuthStore;
  @computed get isSignedIn() {
   return this.authStore.token ? true : false;
  }
  @observable isInitalized = false;
  @computed get token() {
    return;
  }

  constructor() {
    makeObservable(this);
    this.initialize();
  }
  @flow *initialize() {
    try {
      this.isInitalized = true;
    } catch (err) {
      console.error(err);
    }
  }

  signOut = () => {};

  onParamsChange() {}
}
