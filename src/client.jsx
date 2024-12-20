import { render } from "solid-js/web";
import { App } from "./app";
import "./client.css";

document.addEventListener("deviceready", function() {
  render(() => <App />, document.querySelector("body"));
});
