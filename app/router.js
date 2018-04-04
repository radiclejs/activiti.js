'use strict';

module.exports = app => {
  const { router, controller } = app;

  const getAPIPath = function(shortPath) {
    const longPath = `${app.config.API_PATH_HEAD}${shortPath}`;
    return longPath;
  }

  app.router.get('/api/user/:account', 'employee.findByAccount');

  app.router.get('/demo', 'demo.index');
};
