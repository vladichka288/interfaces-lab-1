import { inject, injectable, named } from "inversify";
import { action, makeObservable, observable, observe, runInAction } from "mobx";
import { PersistanceKeys, PersistanceSymbol } from "../utils/persistance";

export interface IAuthStore {
  readonly token: string | null;

  setToken(value: string | null): void;
}

export const AuthStoreSymbol = Symbol.for("IAuthStore");

@injectable()
export class AuthStore implements IAuthStore {
  @named("session")
  @inject(PersistanceSymbol)
  session!: {
    token?: string | null;
  };

  @observable token: string | null = null;

  constructor() {
    makeObservable(this);

    const { token = null } = JSON.parse(
      sessionStorage.getItem(PersistanceKeys.Store) ?? "{}"
    );

    runInAction(() => {
      this.token = token;
    });

    observe(this, () => {
      this.session.token = this.token;
    });
  }

  @action setToken(value: string | null): void {
    this.token = value;
  }
}
