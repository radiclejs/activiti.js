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

  async deploy({id, name, desc, xml, svg}) {
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
    const version = await reProcdef.max('version', {
      where: {
        key: id
      }
    })

    const newVersion = version ? (version + 1) : 1

    const newId = `${id}:${newVersion}:${deployInfo.id}`

    const definitionInfo = await reProcdef.create({
      id: newId,
      name,
      key: id,
      deployment_id: deployInfo.id,
      desc,
      version: newVersion
    })

    // 存储流程定义相关的部署信息。即流程定义文档的存放地(例如bpmn定义文件和自动生成的流程图片)

    // 保存xml
    const xmlInfo = await geBytearray.create({
      name: name + '.bpmn',
      deployment_id: deployInfo.id,
      bytes: Buffer.from(xml, 'utf8'),
      generated: 0
    })

    // 保存svg
    const svgInfo = await geBytearray.create({
      name: name + '.svg',
      deployment_id: deployInfo.id,
      bytes: Buffer.from(svg, 'utf8'),
      // svg是自动生成的
      generated: 1
    })

    return {
      id,
      name,
      deployment_id: deployInfo.id
    }
  }

  async echo() {
    
  }
}

module.exports = RepositoryService;
