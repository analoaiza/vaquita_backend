import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import pool from '../lib/db.pool.js';
import Repository from '../repositories/user.repository.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(options, async function (jwt_payload, done) {
    let dbClient; 
    try {
      dbClient = await pool.connect();
      const user = await Repository(dbClient).getById(jwt_payload.id);
      delete user.password;
      delete user.createdat;
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
    finally{
      if(dbClient){
        dbClient.release();
      }
    }
  })
);
