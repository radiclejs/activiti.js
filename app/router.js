'use strict';

module.exports = app => {
  const { router, controller } = app;
  app.router.get('/api/iduser/:account', 'idUser.findByAccount');
};
