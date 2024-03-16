import { onMount } from "solid-js";
import "./app.css";

export function App() {
  onMount(async () => {
    (await import("./test")).default();
    navigator.notification.alert("message", function(){}, "test", "ok");
  })
  return (
    <div>Test</div>
  );
}
