import Router from "express-promise-router";
import {connectDatabase,commitDatabase, rollbackDatabase} from "../lib/connection.js";
import groupRouter from "./group.router.js";
import usersRouter from "./user.router.js";
import authRouter from "./auth.router.js";

const AsyncRouter = () => {
  const router = Router();

  router.use(connectDatabase);
  //router.use("/auth", groupRouter());
  router.use("/auth", authRouter());
  router.use("/groups", groupRouter());
  router.use("/users", usersRouter());
  router.use(commitDatabase);
  router.use(rollbackDatabase);
  return router;
};

export default AsyncRouter;