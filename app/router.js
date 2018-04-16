'use strict';

module.exports = app => {
  const { router, controller } = app;
  app.router.post('/api/repository/deploy', 'repository.deploy');
  // console.log(controller)
  // identity
  app.router.get('/api/iduser/:id', 'idUser.findById');
  app.router.post('/api/iduser', 'idUser.create');
  app.router.post('/api/iduser/:id', 'idUser.update');
  app.router.post('/api/iduser/:id', 'idUser.del');
};
