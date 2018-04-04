export default interface Context {
  set(key: string, value: string): Function
  get(key: string): Function
}
