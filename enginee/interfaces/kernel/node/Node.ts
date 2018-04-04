export default interface Node {
  // 唯一确定一个节点
  id: string
  from: string
  // 下一个节点的id
  to: string
  // 节点的类型
  type: string
  // 节点的名字
  name: string
  // 节点的标题
  title: string
  // 节点的描述
  desc: string
}
