import "./app.css";
import { render } from "solid-js/web";

function App() {
  return (
    <div>Test</div>
  );
}

document.addEventListener("deviceready", function() {
  render(() => <App />, document.getElementById("app"));
});
