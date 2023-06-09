AFRAME.registerComponent('rod-visibility', {
    init: function () {
        this.camera = document.querySelector('#player');
        this.fishingRod = document.querySelector('#fishing-rod-entity');
        this.raycaster = new THREE.Raycaster();
        this.checkVisibility = this.checkVisibility.bind(this);
    },
    tick: function () {
        this.checkVisibility();
    },
    checkVisibility: function () {
        const cameraPos = this.camera.getAttribute('position');
        const boxPos = this.el.getAttribute('position');
        const direction = new THREE.Vector3(boxPos.x - cameraPos.x, boxPos.y - cameraPos.y, boxPos.z - cameraPos.z).normalize();
        this.raycaster.set(cameraPos, direction);
        const intersects = this.raycaster.intersectObject(this.el.object3D, true);

        if (intersects.length > 0 && intersects[0].distance <= 5) {
            this.fishingRod.setAttribute('visible', true);
            this.fishingRod.setAttribute('position', { x: cameraPos.x, y: cameraPos.y - 0.5, z: cameraPos.z - 1 });
        } else {
            this.fishingRod.setAttribute('visible', false);
        }
    }
});
