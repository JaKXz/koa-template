import { Context, Next } from "koa";

export default function errorMiddleware() {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (err) {
      if (err.status >= 400) console.log("Error handler:", err);
      ctx.status = err.status || 500;
      ctx.body = {
        status: "failed",
        message: err.message || "Internal server error",
      };
    }
  };
}
