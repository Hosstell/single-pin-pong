import {Game} from "./game";
import {setListenHandler} from './socket.js'

export const createGame = (node) => {
  const game = new Game(node)
  game.init()
  game.initContent()
  game.resizeDisplayGL()
  window.game = game


  setListenHandler(game.rotateObject.bind(game))

  const render = function () {
    // console.log('Hello')
    requestAnimationFrame( render )
    game.loop()
  }

  window.addEventListener( 'resize', () => game.resizeDisplayGL(), false );

  render()
}
