export default interface Parser {
  // 读取bpmn文件成json
  toJSON(): object
  toXML(): string
}
