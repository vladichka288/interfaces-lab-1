import { Document } from "mongodb";
import mongoose, { Schema } from "mongoose";
import * as uuid from "uuid";
import { connection } from "../db";

const validateEmail = function (email: string) {
  var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return re.test(email);
};
export const UserSchema = new Schema({
  _id: { type: String, default: uuid.v4 },
  email: {
    trim: true,
    type: String,
    required: [true, "Email is required field"],
    lowearcase: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    trim: true,
    type: String,
    required: [true, "Password is required field"],
  },
  gender: {
    trim: true,
    type: String,
    required: true,
    lowearcase: true,
    enum: ["male", "female"],
  },
  birthdayDate: { type: Date, default: Date.now, required: true },
});

export interface UserDocument extends Document {
  _id: string;
  email: string;
  password: string;
  gender: "male" | "female";
  birthdayDate: Date;
}
export const UserModel = connection.model("User", UserSchema);
