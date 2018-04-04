export default interface Rule {
  getType(): String
  execute(): Boolean
}
