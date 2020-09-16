import fs from "fs";
import path from "path";
import Koa from "koa";
import Router from "@koa/router";
import config from "../config";

const baseName: string = path.basename(__filename);

export default function applyApiMiddleware(app: Koa) {
  const router = new Router({
    // @ts-ignore
    prefix: `/api/${config.server.apiVersion}`,
  });

  // Require all the folders and create a sub-router for each feature api
  fs.readdirSync(__dirname)
    .filter((file: string) => file.indexOf(".") !== 0 && file !== baseName)
    .forEach((file: string) => {
      const api = require(path.join(__dirname, file));
      router.use(api().routes());
    });

  app.use(router.routes()).use(router.allowedMethods());
}
