import { Document } from "mongodb";
import mongoose, { Schema } from "mongoose";
import * as uuid from "uuid";
import { connection } from "../db";

export const ContactSchema = new Schema({
  _id: { type: String, default: uuid.v4 },
  userId: {
    type: String,
    ref: "User", // Имя модели "User" (ссылается на таблицу "users")
  },
  name: {
    type: String,
    required: [true, "Email is required field"],
    unique: true,
  },
  numbers: {
    type: [{ type: String, unique: true }],
    unique: true,
    required: [true, "Number is required field"],
  },
});

export interface ContactDocument extends Document {
  _id: string;
  name: string;
  numbers: string[];
}
export const ContactModel = connection.model("Contact", ContactSchema);
