"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "components");

// Require all the files from the components folder and add the imported to a unique configuration object
module.exports = fs.readdirSync(basePath).reduce((config, file) => {
  const componentConfig = require(path.join(basePath, file));
  return {
    ...config,
    ...componentConfig,
  };
});
