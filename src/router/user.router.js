import Router from 'express-promise-router';
import { UserController } from "../controllers/user.controller.js";
import continuator from '../lib/continue.decorator.js';

const UserRouter = () => {
  const router = Router();
  const userController = UserController();

    router.get("/:id", continuator(userController.getById));
    router.post("/", continuator(userController.create));
    console.log(3, '[User] Router');
    return router;
  };


export default UserRouter ;
