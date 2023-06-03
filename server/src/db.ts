import { config } from "dotenv";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { UserSchema } from "./models/user";
config();

const password = encodeURIComponent(process.env.DB_PASSWORD ?? "");
const uri = `mongodb+srv://vladislavovish596:${password}@vlad-lab-1.b8cvwyn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
export const connection = mongoose.createConnection(uri);
export async function runDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
