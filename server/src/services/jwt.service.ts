import { injectable } from "inversify";
import jwt from "jsonwebtoken";
export interface IJWTService {
  generateToken(uuid: string): string;
}

export type CustomJWTPayload = {
  uuid: string;
};

export const JWTServiceSymbol = Symbol.for("JWTService");

@injectable()
export class JWTService implements IJWTService {
  public generateToken(uuid: string) {
    const token = jwt.sign({ uuid }, process.env.SECRET_TOKEN ?? "secret_key");
    return token;
  }
  static verifyToken(token: string) {
    let userUUID: string | null = null;

    jwt.verify(
      token,
      process.env.SECRET_TOKEN ?? "secret_key",
      (err, decoded) => {
        if (err) {
          throw err;
        }
        userUUID = (decoded as CustomJWTPayload)?.uuid;
      }
    );
    if (!userUUID) {
      throw "Something went wrong";
    }
    return userUUID;
  }
}
