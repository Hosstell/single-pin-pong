import {MTLLoader} from "../modules/MTLLoader.js";
import {OBJLoader} from "../modules/OBJLoader.js";

export default function (pathToObj, pathToMaterial) {
  return new Promise((resolve, reject) => {
    var mtlLoader = new MTLLoader();
    mtlLoader.load( pathToMaterial, (materials) => {
      materials.preload();
      var objLoader = new OBJLoader();
      objLoader.setMaterials( materials );
      objLoader.load( pathToObj, resolve);
    })
  })
}
