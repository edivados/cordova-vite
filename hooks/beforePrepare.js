const fs = require("node:fs");

module.exports = function(ctx) {
  if(process.argv.filter(arg => arg === "run")) {
    const platform = process.argv.filter(arg => ["android", "ios"].includes(arg))?.[0];
    if (!platform) {
      console.error("Missing CORDOVA_PLATFORM env variable. Can be one of [android, ios].");
      process.exit(1);
    }
    const config = fs.readFileSync("config.xml", { encoding: "utf-8" });
    fs.writeFileSync("config.xml", 
      config.replace("index.html", `http://${platform === "android" ? "10.0.2.2" : "127.0.0.1"}:3000/`),
      { encoding: "utf-8" }
    );
  }
};
