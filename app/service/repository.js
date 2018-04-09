'use strict';

const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const toArray = require('stream-to-array');
const fsExtend = require('mz/fs');
const Service = require('egg-cooked').Service;

class RepositoryService extends Service {
  async upload() {
    const stream = await this.ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    return {
      path: target,
      filename
    }
  }

  async buffer() {
    const stream = await this.ctx.getFileStream();
    let buf;
    try {
      const parts = await toArray(stream);
      buf = Buffer.concat(parts);
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public', filename);
    await fsExtend.writeFile(target, buf);

    return {
      filename,
      buffer: buf
    }
  }

  async deploy({id, name, source}) {
    const { geBytearray, reDeployment, reProcdef, geProperty } = this.ctx.service

    // 找下有没生成好的流程部署的主键id
    // const prepareDeployData = await geProperty.findOne({
    //   where: {
    //     name: 'next:db:id'
    //   }
    // })

    // const dbid = prepareDeployData ? prepareDeployData.value : '101'

    // 存放流程定义的显示名和部署时间，每部署一次增加一条记录
    const deployInfo = await reDeployment.create({
      name
    })

    // 存放流程定义的属性信息，部署每个新的流程定义都会在这张表中增加一条记录。
    //  注意：当流程定义的key相同的情况下，使用的是版本升级
    const definitionInfo = await reProcdef.create({
      // id: `${id}:${version}:${deployInfo.id}`,
      name,
      key: id,
      deployment_id: deployInfo.id
    })

    // 存储流程定义相关的部署信息。即流程定义文档的存放地(例如bpmn定义文件和自动生成的流程图片)
    const bytesInfo = await geBytearray.create({
      name,
      deployment_id: deployInfo.id,
      bytes: Buffer.from('string', 'utf8')
    })

    return bytesInfo
  }

  async echo() {
    
  }
}

module.exports = RepositoryService;
