import Router from 'express-promise-router';
import AuthController  from '../controllers/auth.controller.js';
import continuator from '../lib/continue.decorator.js'

const AuthRouter = () => {
  const authController = AuthController();
  console.log(1, '[auth] Router');
    const router = Router();
    console.log(1.1, '[Auth] Routes Registered');
    router.post('/login', continuator(authController.login));
    console.log(2, '[auth] Router');
    return router;
  };


export default AuthRouter;
