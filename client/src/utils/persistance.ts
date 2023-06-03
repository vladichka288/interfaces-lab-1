import { injectable } from "inversify";

export const PersistanceKeys = Object.freeze({
  Store: "lab1",
});
export const PersistanceSymbol = Symbol.for("IPersistance");
export interface IPersistance {
  [key: string]: any;
}

@injectable()
export class Persistance implements IPersistance {
  [key: string]: any;

  static provide(wrappedStorage: Storage) {
    const store: IPersistance = new Persistance();

    try {
      const raw = wrappedStorage.getItem(PersistanceKeys.Store) || "";
      const parsed = JSON.parse(raw);

      for (const key in parsed) {
        store[key] = parsed[key];
      }
    } catch (err) {
      // console.warn('Failed to load Session Store: ', err)
    }

    return new Proxy(store, {
      get(target, p: string) {
        return target[p];
      },
      set(target, p: string, value: any) {
        target[p] = value;
        wrappedStorage.setItem(PersistanceKeys.Store, JSON.stringify(target));

        return true;
      },
    });
  }

  static provideSimple(wrappedStorage: Storage) {
    const store: IPersistance = new Persistance();

    return new Proxy(store, {
      get(target, p: string) {
        return wrappedStorage.getItem(p);
      },
      set(target, p: string, value: any) {
        wrappedStorage.setItem(p, value);
        return true;
      },
    });
  }
}
