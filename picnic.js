
AFRAME.registerComponent('display-button', {
    init: function () {
        this.triggerBox = document.querySelector('#trigger-box');
        this.button = document.querySelector('#load-button');
        this.raycaster = new THREE.Raycaster();
        this.checkVisibility = this.checkVisibility.bind(this);
        this.loadPicnic = this.loadPicnic.bind(this);
    },
    tick: function () {
        this.checkVisibility();
    },
    checkVisibility: function () {
        const cameraPos = this.el.getAttribute('position');
        const boxPos = this.triggerBox.getAttribute('position');
        const direction = new THREE.Vector3(boxPos.x - cameraPos.x, boxPos.y - cameraPos.y, boxPos.z - cameraPos.z).normalize();
        this.raycaster.set(cameraPos, direction);
        const intersects = this.raycaster.intersectObject(this.triggerBox.object3D, true);

        if (intersects.length > 0 && intersects[0].distance <= 5) {
            this.button.style.display = 'block';
            this.button.addEventListener('click', this.loadPicnic);
        } else {
            this.button.style.display = 'none';
            this.button.removeEventListener('click', this.loadPicnic);
        }
    },
    loadPicnic: function () {
        const cameraPos = this.el.getAttribute('position');
        const picnicEntity = document.querySelector('#picnic-entity');
        picnicEntity.setAttribute('visible', true);
        picnicEntity.setAttribute('position', { x: cameraPos.x, y: - 0.5, z: cameraPos.z - 1 });
    }
});

