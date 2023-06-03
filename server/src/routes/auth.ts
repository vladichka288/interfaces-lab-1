import * as express from "express";

import {
  interfaces,
  controller,
  httpPost,
  request,
  response,
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { AuthService, AuthServiceSymbol } from "../services/auth.service";
import { JWTService, JWTServiceSymbol } from "../services/jwt.service";
import { BadRequestError, DuplicateKeyError } from "../models/errors";
@controller("/auth")
export class AuthController implements interfaces.Controller {
  @inject(AuthServiceSymbol) authService!: AuthService;
  @inject(JWTServiceSymbol) jwtService!: JWTService;

  @httpPost("/signin")
  private async SignIn(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = await this.authService.signIn(req.body);
      if (!user) {
        res.status(200).json({ data: { auth: false, token: null } });
        return;
      }
      const token = this.jwtService.generateToken(user._id);
      res.status(200).json({ data: { auth: true, token } });
    } catch (err) {
      AuthController.HandlerError(err, res);
    }
  }

  @httpPost("/signup")
  private async SignUp(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = await this.authService.signUp(req.body);
      if (!user) {
        res.status(201).json({ data: { success: false } });
        return;
      }
      res.status(201).json({ data: { success: true } });
    } catch (err) {
      AuthController.HandlerError(err, res);
    }
  }
  static HandlerError(err: any, @response() res: express.Response): void {
    if (err instanceof DuplicateKeyError) {
      res.status(201).json({ data: { success: false } });
    } else if (err instanceof BadRequestError) {
      res.status(201).json({ data: { success: false } });
    }
    res.statusMessage = "Something went wrong";
    res.status(500).send("Something went wrong");
  }
}
