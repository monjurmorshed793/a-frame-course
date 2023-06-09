AFRAME.registerComponent('cannon-visibility', {
    init: function () {
        this.camera = document.querySelector('#player');
        this.cannon = document.querySelector('#cannon-entity');
        this.raycaster = new THREE.Raycaster();
        this.checkVisibility = this.checkVisibility.bind(this);

        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                this.fireBullet();
            }
        });
    },
    tick: function () {
        this.checkVisibility();
    },
    checkVisibility: function () {
        const cameraPos = this.camera.getAttribute('position');
        const cameraRot = this.camera.getAttribute('rotation');
        const boxPos = this.el.getAttribute('position');
        const direction = new THREE.Vector3(boxPos.x - cameraPos.x, boxPos.y - cameraPos.y, boxPos.z - cameraPos.z).normalize();
        this.raycaster.set(cameraPos, direction);
        const intersects = this.raycaster.intersectObject(this.el.object3D, true);

        if (intersects.length > 0 && intersects[0].distance <= 5) {
            this.cannon.setAttribute('visible', true);
            this.cannon.setAttribute('position', { x: cameraPos.x, y: cameraPos.y - 0.5, z: cameraPos.z - 1 });
            this.cannon.object3D.rotation.set(
                THREE.Math.degToRad(cameraRot.x),
                THREE.Math.degToRad(cameraRot.y - 90),
                THREE.Math.degToRad(cameraRot.z),
                'YXZ'
            );
        } else {
            this.cannon.setAttribute('visible', false);
        }
    },
    fireBullet: function () {
        const cameraPos = this.camera.getAttribute('position');
        const boxPos = this.el.getAttribute('position');
        const direction = new THREE.Vector3(boxPos.x - cameraPos.x, boxPos.y - cameraPos.y, boxPos.z - cameraPos.z).normalize();
        this.raycaster.set(cameraPos, direction);
        const intersects = this.raycaster.intersectObject(this.el.object3D, true);
      
        if (intersects.length > 0 && intersects[0].distance <= 5) {
          const bullet = document.createElement('a-sphere');
          bullet.setAttribute('radius', 0.1);
          bullet.setAttribute('color', 'black');
          bullet.setAttribute('position', this.cannon.getAttribute('position'));
          bullet.setAttribute('dynamic-body', '');
      
          const cameraDirection = this.camera.object3D.getWorldDirection(new THREE.Vector3());
          bullet.setAttribute('velocity', { x: -cameraDirection.x * 20, y: -cameraDirection.y * 20, z: -cameraDirection.z * 20 });
          document.querySelector('a-scene').appendChild(bullet);
        }
    }
});
