import { injectable } from "inversify";
import { ContactInput, UpdateContactInput } from "../dto/contact.dto";
import { SignInInput } from "../dto/sign-in.dto";
import { ContactDocument, ContactModel } from "../models/contact";
import { BadRequestError, DuplicateKeyError } from "../models/errors";
import { UserDocument, UserModel } from "../models/user";

export const ContactServiceSymbol = Symbol.for("ContactService");
export interface IContactService {
  deleteContact(userUid: string, contactUid: string): Promise<void>;
  updateContact(userUid: string, body: UpdateContactInput): Promise<void>;
  createContact(userUid: string, body: ContactInput): Promise<ContactDocument>;
  getContacts(userUid: string): Promise<ContactDocument[]>;
}
@injectable()
export class ContactService implements IContactService {
  async deleteContact(userUid: string, contactUid: string) {
    try {
      const user = await UserModel.findOne({
        _id: userUid,
      });

      if (!user) {
        throw new BadRequestError(`User with provided uid does not exist`);
      }
      await ContactModel.deleteOne({ _id: contactUid });
    } catch (err: any) {
      if (err.code === 11000) {
        if (err.keyPattern.name)
          throw new DuplicateKeyError(`Name should be unique`);
        if (err.keyPattern.numbers)
          throw new DuplicateKeyError(`Each number should be unique`);
      }
      throw new Error(err);
    }
  }
  async updateContact(userUid: string, body: UpdateContactInput) {
    try {
      const user = await UserModel.findOne({
        _id: userUid,
      });

      if (!user) {
        throw new BadRequestError(`User with provided uid does not exist`);
      }
      await ContactModel.updateOne({ _id: body.uid }, body);
    } catch (err: any) {
      if (err.code === 11000) {
        if (err.keyPattern.name)
          throw new DuplicateKeyError(`Name should be unique`);
        if (err.keyPattern.numbers)
          throw new DuplicateKeyError(`Each number should be unique`);
      }
      throw new Error(err);
    }
  }
  async createContact(userUid: string, body: ContactInput) {
    try {
      const user = await UserModel.findOne({
        _id: userUid,
      });

      if (!user) {
        throw new BadRequestError(`User with provided uid does not exist`);
      }
      const createdContact = await ContactModel.create({
        userId: userUid,
        ...body,
      });
      return createdContact;
    } catch (err: any) {
      if (err.code === 11000) {
        if (err.keyPattern.name)
          throw new DuplicateKeyError(`Name should be unique`);
        if (err.keyPattern.numbers)
          throw new DuplicateKeyError(`Each number should be unique`);
      }
      throw new Error(err);
    }
  }
  async getContacts(userUid: string) {
    try {
      const user = await UserModel.findOne({
        _id: userUid,
      });

      if (!user) {
        throw new BadRequestError(`User with provided uid does not exist`);
      }

      const contacts = await ContactModel.find({
        userId: userUid,
      }).sort({ name: 1 });

      return contacts;
    } catch (err: any) {
      if (err.code === 11000) {
        if (err.keyPattern.name)
          throw new DuplicateKeyError(`Name should be unique`);
        if (err.keyPattern.numbers)
          throw new DuplicateKeyError(`Each number should be unique`);
      }
      throw new Error(err);
    }
  }
}
