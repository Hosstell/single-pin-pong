import {Game} from "./game/index.js";

const game = new Game(document.getElementById( 'example' ))
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
