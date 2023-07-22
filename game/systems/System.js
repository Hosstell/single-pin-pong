
export default class System {
  constructor() {
    this.systems = []
  }

  addSystem(system) {
    this.systems.push(system)
  }

  init() {
    this.systems.forEach(system => system.init && system.init())
  }

  run() {
    this.systems.forEach(system => system.run && system.run())
  }
}