import Router from 'express-promise-router';
import { GroupController } from '../controllers/group.controller.js';
import continuator from '../lib/continue.decorator.js';
import passport from 'passport';

const GroupRouter = () => {
    const groupController = GroupController();
    const router = Router();
    router.use(passport.authenticate('jwt',{session:false}));
    console.log(3, '[groups] Router');
    router.get('/:id',continuator(groupController.getById));
    router.get('/', continuator(groupController.getAll));
    router.post('/', continuator(groupController.create));
    router.put('/:id',continuator(groupController.editById));
    router.delete('/:id',continuator(groupController.removeById));

    return router;
  };


export default GroupRouter ;
