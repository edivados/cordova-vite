const fs = require("node:fs");
const rimraf = require("rimraf");

module.exports = function(ctx) {
  rimraf.rimrafSync("www");
  fs.mkdirSync("www");

  if(process.argv.filter(arg => arg === "run")) {
    // const platform = process.argv.filter(arg => ["android", "ios"].includes(arg))?.[0];
    // TODO: copy index.html
    // TODO: transform index.html
    fs.copyFileSync("index.transformed.html", "www/index.html");
    const config = fs.readFileSync("config.xml", { encoding: "utf-8" });
    fs.writeFileSync("config.xml", 
      config
        .replace("index.html", "http://localhost/index.html")
        .replace("</widget>", '<access origin="*" /></widget>'), 
      { encoding: "utf-8" }
    );
  }
};
