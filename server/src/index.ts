import express from "express";
import "reflect-metadata";
import { runDB } from "./db";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import cors from "cors";
import { SetupIoc } from "./ioc-config";
import "./routes/auth";
import { ContactsControllerFactory } from "./routes/contacts";

const container = new Container();
SetupIoc(container);
ContactsControllerFactory(container);
const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  app.use(express.json());
});
const app = server.build();
app.listen(8080, () => {
  runDB().then(() => {
    console.log(`Server runs at ${8080}`);
  });
});
