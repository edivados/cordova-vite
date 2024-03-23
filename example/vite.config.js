import { defineConfig } from 'vite';
import cordova from "cordova-plugin-vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    cordova(),
    solid()
  ]
});
