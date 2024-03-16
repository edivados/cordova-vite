const fs = require("node:fs");

module.exports = function(ctx) {
  if(process.argv.filter(arg => arg === "run")) {
    const config = fs.readFileSync("config.xml", { encoding: "utf-8" });
    fs.writeFileSync(
      "config.xml", 
      config
        .replace("http://localhost/index.html", "index.html")
        .replace('<access origin="*" />', ""), 
      { encoding: "utf-8" }
    );
  }
};
