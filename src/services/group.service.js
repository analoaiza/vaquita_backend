import Repository from '../repositories/group.repository.js';
import ConflictException from '../exceptions/conflict.exception.js';
import NotFoundException from '../exceptions/not-found.exception.js';

const GroupService = (dbClient) => {
  const repository = Repository(dbClient)
  console.log(3, '[Group] Service');

  const getById = async(id) => {
    console.log(3.1, '[Group] Service Get By Id');
    return await repository.getById(id);
  };

  const getAll = async() => {
    console.log(3.1, '[Group] Service Get All');
    return await repository.getAll();
  };

  const create = async (newGroup) => {
    console.log(3.1, '[Group] Service Create');
    const { name } = newGroup;
    const groupFound = await repository.findByName(name);

    if (groupFound) {
      throw new ConflictException('The group already exists');
    }

    return repository.create(newGroup);
  };

  const editById = async (id, group) => {
    console.log(3.1, '[Group] Service Edit');

    const existingGroup = await repository.getById(id);

    if (!existingGroup) {
      throw new NotFoundException(`Group with id ${id} does not exist`);
    }

    return await repository.update(id, group);
  };

  const removeById = async (id) => {
    console.log(3.1, '[Group] Service Remove');

    const existingGroup = await repository.getById(id);

    if (!existingGroup) {
      throw new NotFoundException(`Group with id ${id} does not exist`);
    }

    return await repository.delete(id);
  };

  return {
    getAll,
    getById,
    create,
    editById,
    removeById,
  };
};

export { GroupService };
