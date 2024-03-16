import { render } from "solid-js/web";
import { App } from "./app";

document.addEventListener("deviceready", function() {
  render(() => <App />, document.getElementById("app"));
});
