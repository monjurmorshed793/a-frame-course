AFRAME.registerComponent('display-button', {
  init: function () {
    this.triggerBoxes = Array.from(document.querySelectorAll('.trigger-box'));
    this.infoLayers = Array.from(document.querySelectorAll('.info-layer'));
    this.arrow = document.querySelector('#arrow');
    this.raycaster = new THREE.Raycaster();
    this.checkVisibility = this.checkVisibility.bind(this);
    this.loadInfoLayer = this.loadInfoLayer.bind(this);
    this.hideInfoLayer = this.hideInfoLayer.bind(this);
    this.createPath = this.createPath.bind(this);
    this.path = null;
  },
  tick: function () {
    this.checkVisibility();
  },
  checkVisibility: function () {
    const cameraPos = this.el.getAttribute('position');

    this.triggerBoxes.forEach((box, i) => {
      const boxPos = box.getAttribute('position');
      const direction = new THREE.Vector3(boxPos.x - cameraPos.x, boxPos.y - cameraPos.y, boxPos.z - cameraPos.z).normalize();
      this.raycaster.set(cameraPos, direction);
      const intersects = this.raycaster.intersectObject(box.object3D, true);

      const button = document.querySelector(`#load-button-${i + 1}`);
      if (intersects.length > 0 && intersects[0].distance <= 5) {
        button.style.display = 'block';
        button.addEventListener('click', this.loadInfoLayer(i));
      } else {
        button.style.display = 'none';
        button.removeEventListener('click', this.loadInfoLayer(i));
      }
    });
  },
  loadInfoLayer: function (i) {
    return function () {
      this.infoLayers[i].style.display = 'block';
      this.infoLayers[i].querySelector('button').addEventListener('click', this.hideInfoLayer(i));
    }.bind(this);
  },
  hideInfoLayer: function (i) {
    return function () {
      this.infoLayers[i].style.display = 'none';
      this.arrow.style.display = 'block';
      this.arrow.onclick = () => {
        this.arrow.style.display = 'none';
      };
      if (this.path) {
        this.path.remove();
      }
      this.createPath(i);
    }.bind(this);
  },
  createPath: function (i) {
    const nextBox = this.triggerBoxes[i + 1];
    if (!nextBox) return;

    if (!this.path) {
      this.path = document.createElement('a-box');
      document.querySelector('a-scene').appendChild(this.path);
    }

    const currentBoxPos = this.triggerBoxes[i].getAttribute('position');
    const nextBoxPos = nextBox.getAttribute('position');

    this.path.setAttribute('position', {
      x: (currentBoxPos.x + nextBoxPos.x) / 2,
      y: 0,
      z: (currentBoxPos.z + nextBoxPos.z) / 2
    });

    const distance = Math.sqrt(
      Math.pow(nextBoxPos.x - currentBoxPos.x, 2) +
      Math.pow(nextBoxPos.y - currentBoxPos.y, 2) +
      Math.pow(nextBoxPos.z - currentBoxPos.z, 2)
    );
    this.path.setAttribute('scale', {x: 1, y: 0.1, z: distance});

    this.path.setAttribute('color', 'yellow');
    this.path.setAttribute('animation', {
      property: 'color',
      to: 'red',
      dur: '1000',
      dir: 'alternate',
      loop: 'true'
    });

    const dx = nextBoxPos.x - currentBoxPos.x;
    const dz = nextBoxPos.z - currentBoxPos.z;
    const angle = Math.atan2(dz, dx);
    this.path.setAttribute('rotation', {x: 0, y: THREE.Math.radToDeg(angle), z: 0});
  }
});
