var utils = require('./../../utils/utils');

function createGameRocketDuel() {
  let a = new Date().getTime()
  let b = a + 1
  let c = b + 1

  return {
    game: utils.sha256(a.toString()),
    left: utils.sha256(b.toString()),
    right: utils.sha256(c.toString())
  }

}

module.exports.createGameRocketDuel = createGameRocketDuel
