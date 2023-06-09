AFRAME.registerComponent('collision-listener', {
    init: function () {
      this.el.addEventListener('collide', function (e) {
        console.log('Player has collided with ', e.detail.body.el);
        e.detail.target.el;  // Original entity (playerEl).
        e.detail.body.el;  // Other entity, which playerEl touched.
        e.detail.contact;  // Stats about the collision (CANNON.ContactEquation).
        e.detail.contact.ni;  // Normal (direction) of the collision (CANNON.Vec3).
      });
    }
  });
  