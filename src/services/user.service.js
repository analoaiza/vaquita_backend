import  Repository from '../repositories/user.repository.js';

const UserService = (dbClient) => {
  console.log(3, '[User] Service');

  const userRepository = Repository(dbClient);

  const getById = (id) => {
    console.log(3.1, '[User] Service Get By Id');

    return userRepository.getById(id);
  };

  const create = (newUser) => {
    console.log(3.1, '[User] Service Create');

    return userRepository.create(newUser);
  };

  const getByEmail = (email) => {
    console.log(3.1, '[User] Service Get By email');

    return userRepository.getByEmail(email);
  };


  return {
    getById,
    create,
    getByEmail,
  };
};

export { UserService };
