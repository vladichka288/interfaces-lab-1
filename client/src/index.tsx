import React from "react";
import "reflect-metadata";
import "setimmediate";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { App } from "./App";
import { Container } from "inversify";

import ioc from "./ioc";
import iocConfig from "./ioc-config";
import history from "./history";
import "./styles/form.css";
async function start() {
  try {
    const container = new Container();
    ioc.setContainer(container);
    iocConfig.configure(container);
    iocConfig.bindHistory(container, history);

    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );
    root.render(<App />);
  } catch (err) {
    console.error(err);
  }
}
start();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
