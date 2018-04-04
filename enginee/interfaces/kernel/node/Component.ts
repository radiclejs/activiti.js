export default interface Component {
  status: String
  lock(): void
  input(): Object
  output(): Object
  execute(): Promise<any>
}
