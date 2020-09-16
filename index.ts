import http, { Server } from "http";
import server from "./server";
import config from "./config";

async function bootstrap(): Promise<Server> {
  /**
   * Add external services init as async operations (db, redis, etc...)
   * e.g.
   * await sequelize.authenticate()
   */
  // @ts-ignore
  return http.createServer(server.callback()).listen(config.server.port);
}

bootstrap()
  .then((server: Server) =>
    // @ts-ignore
    console.log(`🚀 Server listening on port ${server.address().port}!`),
  )
  .catch((err) => {
    setImmediate(() => {
      console.error("Unable to run the server because of the following error:");
      console.error(err);
      process.exit(1);
    });
  });
