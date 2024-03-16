const fs = require("node:fs");

module.exports = function(ctx) {
  // TODO: only if cmd contains `cordova run`
  let content = '<content src="index.html" />';
  const config = fs.readFileSync("config.xml", { encoding: "utf-8" });
  fs.writeFileSync("config.xml", config.replace(/\<content src=.* \/\>/, content), { encoding: "utf-8" });
};
