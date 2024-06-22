import { UserService } from '../services/user.service.js';
import { StatusCodes } from 'http-status-codes';

const UserController = () => {
  console.log(2, '[User] Controller');


  const getById = async (req, res) => {
    console.log(2.1, '[User] Controller Get By Id');
    const userService = UserService(req.dbClient);
    const user = await userService.getById(req.params.id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `User with id ${req.params.id} does not exist` });
    }

    return res.status(StatusCodes.OK).json({
      user,
    });
  };

  const create = async (req, res) => {
    console.log(2.1, '[User] Controller Create');
   const userService = UserService(req.dbClient); 
    const user = await userService.create(req.body);

    return res.status(StatusCodes.CREATED).json(user);
  };

  return {
    getById,
    create,
  };
};

export { UserController };
