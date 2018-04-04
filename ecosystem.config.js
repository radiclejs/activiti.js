'use strict';

const os = require('os');

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'lottery_agent',
      script    : 'agent_setup.js',
      env: {
        PROCESS_TYPE: 'agent',
      },
      env_production : {
        NODE_ENV: 'production',
        EGG_SERVER_ENV: 'prod'
      }
    },

    // Second application
    {
      name      : 'lottery_app',
      script    : 'app_setup.js',
      env: {
        PROCESS_TYPE: 'app'
      },
      env_production : {
        NODE_ENV: 'production',
        EGG_SERVER_ENV: 'prod'
      },
      instances  : os.cpus().length,
      exec_mode  : 'cluster',
      instance_var: 'NODE_APP_INSTANCE'
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   },
  //   dev : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/development',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
  //     env  : {
  //       NODE_ENV: 'dev'
  //     }
  //   }
  // }
};
