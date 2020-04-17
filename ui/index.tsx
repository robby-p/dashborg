import ReactDOM from "react-dom";
import React from "react";
import { App } from "./App";

if (module.hot) module.hot.accept(window.location.reload);
ReactDOM.render(<App />, document.getElementById("app"));
