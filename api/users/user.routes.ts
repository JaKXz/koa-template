import Router from "@koa/router";
import { createOne, getAll, getOne } from "./user.controller";

export default function userRoutes() {
  const router = new Router({
    prefix: `/users`,
  });

  // prettier-ignore
  router
    .get("/:userId", getOne)
    .get("/", getAll)
    .post("/", createOne);

  return router;
}
