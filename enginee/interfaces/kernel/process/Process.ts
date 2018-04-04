import Context from './Context'
import Node from '../node/Node'

export default interface Process {
  // 唯一确定一个流程
  id: String
  // 继承的流程id
  parentId: String
  // // 默认的节点id
  // defaultNodeId: String
  // // 开始的节点id
  // beginNodeId: String
  // // 结束的节点id
  // endNodeId: String
  // 所拥有的节点
  nodes: Array<Node>
  // 是否可用
  enable: Boolean
  // 版本号, 同一id的流程可以存在多个版本，访问时，如果不指定版本则默认采用最新版本
  version: String
  // 流程的名字
  name: String
  // 流程的标题
  title: String
  // 流程的描述
  desc: String
  // 当前流程的上下文数据
  context: Context
  // 当前流程的状态
  status: String
}
