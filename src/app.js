import "dotenv/config";
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import { applyJWTAuthentication } from './middlewares/auth.middleware.js';
import './utils/passport.config.js'; // Your Passport configuration
import mainRouter from './router/async.router.js';


const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//auth stuff
app.use(applyJWTAuthentication);

app.use(mainRouter());
// app.use('/users', UserRouter().registerRoutes());
// app.use('/auth', AuthRouter().registerRoutes());

app.listen(PORT, () => {
  console.log(`Express server running on port http://localhost:${PORT} 🚀`);
});
