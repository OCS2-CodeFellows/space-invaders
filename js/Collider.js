function Collider(element) {
  this.element = element;
  this.rect = element.getBoundingClientRect();
  Collider.instances.push(this);

}

Collider.instances = [];

Collider.prototype.deleteCollider = function() {
  for (let i = 0; i < Collider.instances.length; i++) {
    if (Collider.instances[i].element === this.element) {
      Collider.instances.splice(i, 1);
    }
  }
};

Collider.checkCollisions = function() {
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
};
