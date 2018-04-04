
const Controller = require('../../framework').Controller;

class DemoController extends Controller {
  async index() {
    const data = {
      name: 'tom',
      age: 11
    };
    const redis = this.app.redis.get('pub');
    const test001 = await redis.get('test001');
    data.test001 = test001;
    await this.ctx.render('demo/index.html', data);
  }

  async saveRedis() {
    const { value } = this.ctx.query;
    await this.app.redis.get('pub').set('test001', value);
    this.ctx.body = {
      status: 'success'
    };
  }

  async createNotify() {
    const { io } = this.app;
    const { username, content } = this.ctx.query;
    io.to(username).emit('notify', content);
    this.ctx.body = {
      status: 'success'
    }
  }

  // test cookie
  cookie() {
    const { cookies } = this.ctx;
    // If you don't want to allow JS to access and modify Cookie:
    cookies.set('tom', '1888', {
      httpOnly: true,
      encryt: true
    })

    // If you need to allow JS to access and modify Cookie:
    cookies.set('alice', '1999', {
      httpOnly: false,
      signed: false
    });

    this.ctx.body = 'test cookie';
  }

  // test session
  session() {
    const { session } = this.ctx;
    session.username = 'tony';
    this.ctx.body = 'test session';
  }

  // test error handle
  error() {
    error.name = 'testOnError';
    this.ctx.body = error;
  }

  // test validate
  validate() {
    this.ctx.validate({
      id: 'id'
    }, {
      id: 'ssss'
    });
  }

  i18n() {
    const data = this.ctx.__('Welcome back, %s! %s', 'tom', 'dude');
    this.ctx.body = data;
  }

  jsonp() {
    this.ctx.body = {
      name: 'tom',
      sex: 'male',
      age: 11
    }
  }
}

module.exports = DemoController;
