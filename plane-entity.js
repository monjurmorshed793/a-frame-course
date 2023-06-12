

AFRAME.registerComponent('drive-plane', {
    init: function () {
      this.camera = document.querySelector('#player');
      this.originalPosition = {x: this.camera.x, y: this.camera.y, z: this.camera.z}; // The original position of the camera before driving
      this.isDriving = true; // Flag to track if the camera is currently driving the car
      this.raycaster = new THREE.Raycaster(); // here, what is THREE.Raycaster()?
      
    this.checkVisibility = this.checkVisibility.bind(this);
     this.driveCar = this.driveCar.bind(this);
    this.leaveCar = this.leaveCar.bind(this);
     this.driveCar();
    },
    tick: function () {
        this.checkVisibility();
        if (this.isDriving) {
          const newPosition = this.camera.getAttribute('position');
          const carPosition = this.el.getAttribute('position');
          this.el.setAttribute('position', {x: newPosition.x, y: carPosition.y, z: newPosition.z});
        }
    },
    checkVisibility: function () {
      const cameraPos = this.camera.getAttribute('position');
      const carPos = this.el.getAttribute('position');
      const direction = new THREE.Vector3(cameraPos.x, cameraPos.y,cameraPos.z).normalize();
      this.raycaster.set(cameraPos, direction);
      const intersects = this.raycaster.intersectObject(this.el.object3D, true);
      
    },
    driveCar: function () {
      this.isDriving = true;
      this.originalPosition = this.camera.getAttribute('position');
      const carPos = this.el.getAttribute('position');
      this.camera = document.querySelector('#player');
      this.camera.setAttribute('position', {x: carPos.x, y: carPos.y+30, z: (carPos.z)}); // Assume that the roof is 1 unit above the car's position
      carPos.setAttribute('position', {x: this.camera.x, y: this.camera.y, z: this.camera.z-30}
    },
    leaveCar: function () {
        this.isDriving = false;
        const carPos = this.el.getAttribute('position');
        this.camera.setAttribute('position', {x: carPos.x - 2, y: 1.6, z: carPos.z-20}); // Assume you want to get off to the left of the car
      }      
});
