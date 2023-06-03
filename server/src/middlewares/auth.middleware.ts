import * as express from "express";
import { inject } from "inversify";
import { JWTService } from "../services/jwt.service";
export const AuthMiddlewareSymbol = Symbol.for("AuthMiddlweare");
export const AuthMiddleware = (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const uid = JWTService.verifyToken(
      req.headers.authorization
        ? req.headers.authorization?.split("Bearer ")[1]
        : ""
    );
    //@ts-ignore
    req.user = uid;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid JWT Token" });
  }
};

export type RequestWithUser = express.Request & { user: string };
