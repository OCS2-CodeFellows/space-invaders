function Collider(element, dynamic = true) {
  this.element = element;
  this.rect = element.getBoundingClientRect();
  this.dynamic = dynamic;
  Collider.instances.push(this);
  
  // else {
  //   Collider.staticInstances.push(this);
  // }
}

// COLLIDER - A collider, in this case, is just a box drawn around an element. We use a function to detect if any of these boxes are touching each other.
// STATIC - Static colliders are typically placed on non-moving objects, like the floor or walls. In our case,
Collider.instances = [];
// Collider.dynamicInstances = [];


Collider.checkCollisions = function() {
  // console.log("BEGIN CHECK")
  const checkInstances = Collider.instances.slice();
  while (checkInstances.length > 1) {
    const colliderOne = checkInstances[0];
    checkInstances.shift();
    for (const colliderTwo of checkInstances) {
      const c1 = colliderOne.element.getBoundingClientRect();
      const c2 = colliderTwo.element.getBoundingClientRect();
      if (c1.x < c2.x + c2.width &&
          c1.x + c1.width > c2.x &&
          c1.y < c2.y + c2.height &&
          c1.height + c1.y > c2.y) {
        return [colliderOne, colliderTwo];
      }
    }
  }
  // for (const colliderOne of checkInstances) {

  //   checkInstances.shift();
  //   for (const colliderTwo of checkInstances) {
  //     console.log("CHECK ONE", colliderOne);
  //     console.log("CHECK TWO", colliderTwo);
  //   }
  // }
  // Grab the boxes of all dynamic colliders.
  //   dynamicCollider.rect = dynamicCollider.element.getBoundingClientRect();
  //   const dc = dynamicCollider.rect; // Smaller const name
  //   for (const staticCollider of Collider.staticInstances) {
  //     // Grab the boxes of all static colliders.
  //     staticCollider.rect = staticCollider.element.getBoundingClientRect();
  //     const sc = staticCollider.rect; // Smaller const name
  //     // AABB vs. AABB, Axis-Aligned Bounding Box Collision
  //     if (dc.x < sc.x + sc.width &&
  //       dc.x + dc.width > sc.x &&
  //       dc.y < sc.y + sc.height &&
  //       dc.height + dc.y > sc.y) {
  //       return [dynamicCollider, staticCollider];
  //     }
  //   }
  // }
};
