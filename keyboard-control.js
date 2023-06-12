    AFRAME.registerComponent('keyboard-controls', {
      schema: {
        target: { type: 'selector' },
        moveDelta: { type: 'number', default: 0.05 }
      },
      init: function () {
        this.moveVector = new THREE.Vector3();
        this.bindMethods();
        this.addEventListeners();
      },
      bindMethods: function () {
        this.moveAirplane = this.moveAirplane.bind(this);
      },
      addEventListeners: function () {
        window.addEventListener('keydown', this.moveAirplane);
      },
      removeEventListeners: function () {
        window.removeEventListener('keydown', this.moveAirplane);
      },
      moveAirplane: function (event) {
        const key = event.key.toLowerCase();
        const { target, moveDelta } = this.data;
        if (key === 'arrowup' || key === 'w') {
          this.moveVector.set(0, 0, -moveDelta);
        } else if (key === 'arrowdown' || key === 's') {
          this.moveVector.set(0, 0, moveDelta);
        } else if (key === 'arrowleft' || key === 'a') {
          this.moveVector.set(-moveDelta, 0, 0);
        } else if (key === 'arrowright' || key === 'd') {
          this.moveVector.set(moveDelta, 0, 0);
        } else {
          return;
        }
        target.object3D.position.add(this.moveVector);
      },
      update: function (oldData) {
        if (oldData.target !== this.data.target) {
          this.removeEventListeners();
          this.addEventListeners();
        }
      },
      remove: function () {
        this.removeEventListeners();
      }
    });