import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.create)
  .get('/:email', controller.getByEmail)
  .put('/:email', controller.updateByEmail)
  .delete('/:email', controller.deleteByEmail);
