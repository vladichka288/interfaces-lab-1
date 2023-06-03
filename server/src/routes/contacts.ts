import * as express from "express";

import {
  interfaces,
  controller,
  httpPost,
  request,
  response,
  httpGet,
  httpPut,
  httpDelete,
  params,
  requestParam,
} from "inversify-express-utils";
import { injectable, inject, Container } from "inversify";
import { AuthService, AuthServiceSymbol } from "../services/auth.service";
import {
  AuthMiddlewareSymbol,
  RequestWithUser,
} from "../middlewares/auth.middleware";
import {
  ContactService,
  ContactServiceSymbol,
} from "../services/contact.service";
import { BadRequestError, DuplicateKeyError } from "../models/errors";

export function ContactsControllerFactory(container: Container) {
  @controller("/contacts")
  class ContactsController implements interfaces.Controller {
    @inject(AuthServiceSymbol) authService!: AuthService;
    @inject(ContactServiceSymbol) contactService!: ContactService;

    @httpGet("/", container.get<express.RequestHandler>(AuthMiddlewareSymbol))
    private async GetContacts(
      @request() req: RequestWithUser,
      @response() res: express.Response
    ) {
      try {
        const contacts = await this.contactService.getContacts(req.user);
        const contactsToSend = contacts.map((contact) => ({
          uid: contact._id,
          name: contact.name,
          numbers: contact.numbers,
        }));
        return res.status(200).json({ data: contactsToSend });
      } catch (err) {
        ContactsController.HandlerError(err, res);
      }
    }
    @httpPost(
      "/create",
      container.get<express.RequestHandler>(AuthMiddlewareSymbol)
    )
    private async PostContact(
      @request() req: RequestWithUser,
      @response() res: express.Response
    ) {
      try {
        const contact = await this.contactService.createContact(
          req.user,
          req.body
        );
        return res.status(201).json({ data: { uuid: contact._id } });
      } catch (err) {
        ContactsController.HandlerError(err, res);
      }
    }

    @httpPut(
      "/update",
      container.get<express.RequestHandler>(AuthMiddlewareSymbol)
    )
    private async PutContact(
      @request() req: RequestWithUser,
      @response() res: express.Response
    ) {
      try {
        await this.contactService.updateContact(req.user, req.body);
        return res.status(200).json({ data: { success: true } });
      } catch (err) {
        ContactsController.HandlerError(err, res);
      }
    }

    @httpDelete(
      "/:uid",
      container.get<express.RequestHandler>(AuthMiddlewareSymbol)
    )
    private async DeleteContact(
      @requestParam("uid") uid: string,
      @request() req: RequestWithUser,
      @response() res: express.Response
    ) {
      try {
        await this.contactService.deleteContact(req.user, uid);
        return res.status(200).json({ data: { success: true } });
      } catch (err) {
        ContactsController.HandlerError(err, res);
      }
    }
    static HandlerError(err: any, @response() res: express.Response): void {
      if (err instanceof DuplicateKeyError) {
        res.statusMessage = err.message;
        res.status(400).send(err.message);
      } else if (err instanceof BadRequestError) {
        res.statusMessage = err.message;
        res.status(400).send(err.message);
      } else {
        res.statusMessage = "Something went wrong";
        res.status(500).send("Something went wrong");
      }
    }
  }
}
