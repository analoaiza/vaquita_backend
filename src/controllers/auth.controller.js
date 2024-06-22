import { UserService } from '../services/user.service.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const AuthController = () => {
  console.log(2, '[Auth] Controller');

  const login = async (req, res) => {
    const { email, password } = req.body;
    const userService = UserService(req.dbClient);
    console.log('password',password)
    const user = await userService.getByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user.id };
    // { expiresIn: "1h"}
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(StatusCodes.OK).json({ token });
  };

  return {
    login,
  };
};

export default AuthController ;
