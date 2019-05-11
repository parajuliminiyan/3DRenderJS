// import Ammo from "@stardazed/ammo";
// // import Ammo from 'ammo.js';

export default class PhysicsWorld {
  dynamicsWorld: Ammo;
  constructor() {
    let ammo = new Ammo();
    let boardphase = ammo.btDbvtBroadphase();
    let collConfig = ammo.btDefaultCollisionConfiguration();
    let dispatcher = ammo.btCollisionDispatcher(collConfig);
    let solver = ammo.btSequentialImpulseConstraintSolver();
    this.dynamicsWorld = ammo.btDiscreteDynamicsWorld(
      dispatcher,
      boardphase,
      solver,
      collConfig
    );

    this.dynamicsWorld.setGravity(ammo.btVector3(0, -10, 0));
    for (let i = 0; i < 100; i++) {
      this.dynamicsWorld.stepSimulation(1 / 60, 10);
      for (
        let j = this.dynamicsWorld.getNumCollisionObjects() - 1;
        j > 0;
        j--
      ) {
        let obj = ammo.btCollisionObject();
        obj = this.dynamicsWorld.getCollisionObjectsArray()[j];
        let body = ammo.btRigidBody();
        let trans = ammo.btTransform();
        if (body && body.getMotionState()) {
          body.getMotionState().getWorldTransform(trans);
        } else {
          trans = obj.getWorldTransform();
        }
        console.log(
          `${j} \n ${trans
            .getOrigin()
            .getX()} \n ${trans
            .getOrigin()
            .getY()} \n trans . getOrigin () . getZ ()`
        );
      }
    }
  }

  
}
