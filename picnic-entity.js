AFRAME.registerComponent('display-button', {
    init: function () {
        this.camera = document.querySelector('#player');
        this.button = document.querySelector('#load-button');
        this.picnicEntity = document.querySelector('#picnic-entity');
        this.raycaster = new THREE.Raycaster();
        this.checkVisibility = this.checkVisibility.bind(this);
        this.loadPicnic = this.loadPicnic.bind(this);
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
            this.button.style.display = 'block';
            this.button.addEventListener('click', this.loadPicnic);
        } else {
            this.button.style.display = 'none';
            this.button.removeEventListener('click', this.loadPicnic);
        }
    },
    loadPicnic: function () {
        const cameraPos = this.camera.getAttribute('position');
        this.picnicEntity.setAttribute('visible', true);
        this.picnicEntity.setAttribute('position', { x: cameraPos.x, y: - 0.5, z: cameraPos.z - 1 });
    }
});
