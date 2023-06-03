import { Container } from "inversify";
import * as express from "express";
import {
  AuthService,
  AuthServiceSymbol,
  IAuthService,
} from "./services/auth.service";
import {
  AuthMiddleware,
  AuthMiddlewareSymbol,
} from "./middlewares/auth.middleware";
import {
  IJWTService,
  JWTService,
  JWTServiceSymbol,
} from "./services/jwt.service";
import {
  ContactService,
  ContactServiceSymbol,
  IContactService,
} from "./services/contact.service";
export function SetupIoc(container: Container) {
  container.bind<IAuthService>(AuthServiceSymbol).to(AuthService);
  container.bind<IContactService>(ContactServiceSymbol).to(ContactService);
  //middlewares

  container.bind<IJWTService>(JWTServiceSymbol).to(JWTService);
  container
    .bind<express.RequestHandler>(AuthMiddlewareSymbol)
    .toConstantValue(AuthMiddleware);
}
