import data from "../data.js";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

export default class ThreejsSystemInitRocket {
  init() {
    var mtlLoader = new MTLLoader();
    mtlLoader.load( './objects/rocket/rocket.mtl', (materials) => {
      materials.preload();
      var objLoader = new OBJLoader();
      objLoader.load( './objects/rocket/rocket.obj', object => {
        object.receiveShadow = true
        object.children[0].receiveShadow = true
        data.threejs.objects.rocket = object
        data.threejs.scene.add( object );
        console.log("Rocket object is added success!")
      });
      objLoader.setMaterials( materials );
    })
  }
}