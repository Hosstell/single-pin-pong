import System from "./systems/System.js";
import SocketSystemInit from "./systems/SocketSystemInit.js";
import SocketSystemGettingData from "./systems/SocketSystemGettingData.js";
import ThreejsSystemInitScene from "./systems/ThreejsSystemInitScene.js";
import ThreejsSystemInitRocket from "./systems/ThreejsSystemInitRocket.js";
import ThreejsSystemRunAnimation from "./systems/ThreejsSystemRunAnimation.js";
import ThreejsSystemInitBall from "./systems/ThreejsSystemInitBall.js";
import ThreejsSystemInitLights from "./systems/ThreejsSystemInitLights.js";
import ThreejsSystemRocketRotation from "./systems/ThreejsSystemRocketRotation.js";
import ThreejsSystemRocketMovement from "./systems/ThreejsSystemRocketMovement.js";
import ThreejsSystemPhysicsInit from "./systems/ThreejsSystemPhysicsInit.js";
import ThreejsSystemOrbitControls from "./systems/ThreejsSystemOrbitControls.js";
import ThreejsSystemResetBallWhenFall from "./systems/ThreejsSystemResetBallWhenFall";


var systems = new System()

systems.addSystem(new SocketSystemInit())
systems.addSystem(new SocketSystemGettingData())

systems.addSystem(new ThreejsSystemInitScene())
systems.addSystem(new ThreejsSystemOrbitControls())
systems.addSystem(new ThreejsSystemInitLights())
systems.addSystem(new ThreejsSystemInitRocket())
systems.addSystem(new ThreejsSystemInitBall())
systems.addSystem(new ThreejsSystemPhysicsInit())
systems.addSystem(new ThreejsSystemResetBallWhenFall())

systems.addSystem(new ThreejsSystemRocketRotation())
systems.addSystem(new ThreejsSystemRocketMovement())
systems.addSystem(new ThreejsSystemRunAnimation())

systems.init()

function run() {
  requestAnimationFrame(run);
  systems.run()
}
run();


