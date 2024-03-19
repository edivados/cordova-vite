const fs = require("node:fs");

module.exports = function(ctx) {
  if(process.argv.find(arg => arg === "run")) {
    const platform = ctx.opts.platforms.length === 1 && ctx.opts.platforms.find(platform => platform === "android" || platform === "ios");
    if (platform) {
      const config = fs.readFileSync("config.xml", { encoding: "utf-8" });
      fs.writeFileSync("config.xml", 
        config.replace(`http://${platform === "android" ? "10.0.2.2" : "127.0.0.1"}:3000/`, "index.html"),
        { encoding: "utf-8" }
      );
    }
  }
};
