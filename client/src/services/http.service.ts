import { inject, injectable } from "inversify";
import { AuthStoreSymbol, IAuthStore } from "../stores/auth.store";
import { AuthServiceSymbol, IAuthService } from "./auth.service";

export const HTTPServiceSymbol = Symbol.for("IHTTPServiceSymbol");

export interface IHTTPService {

  PUT<T>(route: string, body: Object): Promise<T>;
  POST<T>(route: string, body: Object): Promise<T>;
  DELETE<T>(route: string): Promise<T>;
  GET<T>(route: string): Promise<T>;
}
@injectable()
export class HTTPService implements IHTTPService {
  @inject(AuthStoreSymbol) authStore!: IAuthStore;

  async PUT<T>(route: string, body: Object) {
    const authHeader: HeadersInit = this.authStore.token
      ? { Authorization: "Bearer " + this.authStore.token }
      : {};
    const response = await fetch(`http://localhost:8080${route}`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        ...authHeader,
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const parsedResponse = await response.json();
      return parsedResponse.data as T;
    }
    return this.HandleStatus(response);
  }
  async POST<T>(route: string, body: Object) {
    const authHeader: HeadersInit = this.authStore.token
      ? { Authorization: "Bearer " + this.authStore.token }
      : {};
    const response = await fetch(`http://localhost:8080${route}`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        ...authHeader,
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const parsedResponse = await response.json();
      return parsedResponse.data as T;
    }
    return this.HandleStatus(response);
  }
  async GET<T>(route: string) {
    const authHeader: HeadersInit = this.authStore.token
      ? { Authorization: "Bearer " + this.authStore.token }
      : {};
    const response = await fetch(`http://localhost:8080${route}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        ...authHeader,
      },
    });
    if (response.ok) {
      const parsedResponse = await response.json();
      return parsedResponse.data as T;
    }
    return this.HandleStatus(response);
  }
  async DELETE<T>(route: string) {
    const authHeader: HeadersInit = this.authStore.token
      ? { Authorization: "Bearer " + this.authStore.token }
      : {};
    const response = await fetch(`http://localhost:8080${route}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        ...authHeader,
      },
    });
    if (response.ok) {
      const parsedResponse = await response.json();
      return parsedResponse.data as T;
    }
    return this.HandleStatus(response);
  }

  public HandleStatus(res: any): never {
    if (res.status == 401) {
      this.authStore.setToken(null);

      throw new Error(res.statusText);
    }

    throw new Error(res.statusText);
  }
}
