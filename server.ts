import Koa from "koa";
import bodyParser from "koa-bodyparser";
import compress from "koa-compress";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import logger from "koa-logger";
import errorHandler from "./middleware/error.middleware";
import applyApiMiddleware from "./api";
// @ts-ignore
import { isDevelopment } from "./config";

const server = new Koa();

/**
 * Add development-only middleware
 */
if (isDevelopment) {
  server.use(logger());
}

// Pass middleware to our server instance
// prettier-ignore
server
  .use(errorHandler())
  .use(helmet())
  .use(compress())
  .use(cors())
  .use(bodyParser());

/**
 * Apply the api router to our server
 */
applyApiMiddleware(server);

export default server;
