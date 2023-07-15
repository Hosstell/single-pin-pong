import data from "../data.js";
import {MTLLoader} from "../modules/MTLLoader.js";
import {OBJLoader} from "../modules/OBJLoader.js";

export default class ThreejsSystemInitRocket {
  init() {
    var mtlLoader = new MTLLoader();
    mtlLoader.load( './objects/rocket/rocket.mtl', (materials) => {
      materials.preload();
      var objLoader = new OBJLoader();
      objLoader.load( './objects/rocket/rocket.obj', object => {

        // object.children[0].rotation.set(0, 0, 90 * Math.PI / 180)
        // object.children[0].position.set(0, 0, 0)

        data.threejs.objects.rocket = object
        data.threejs.scene.add( object );
        console.log("Rocket object is added success!")
      });
      objLoader.setMaterials( materials );
    })
  }
}