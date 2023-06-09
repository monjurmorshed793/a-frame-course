AFRAME.registerComponent('drive-car', {
    init: function () {
      this.car = document.querySelector('#car');
      this.driveButton = document.querySelector('#drive-button');
      this.leaveButton = document.querySelector('#leave-button');
      this.originalPosition = {x: 0, y: 0, z: 0}; // The original position of the camera before driving
      this.isDriving = false; // Flag to track if the camera is currently driving the car
      this.raycaster = new THREE.Raycaster();
      this.checkVisibility = this.checkVisibility.bind(this);
      this.driveCar = this.driveCar.bind(this);
      this.leaveCar = this.leaveCar.bind(this);
    },
    tick: function () {
        this.checkVisibility();
        if (this.isDriving) {
          const newPosition = this.el.getAttribute('position');
          const carPosition = this.car.getAttribute('position');
          this.car.setAttribute('position', {x: newPosition.x, y: carPosition.y, z: newPosition.z});
        }
    },
    checkVisibility: function () {
      const cameraPos = this.el.getAttribute('position');
      const carPos = this.car.getAttribute('position');
      const direction = new THREE.Vector3(carPos.x - cameraPos.x, carPos.y - cameraPos.y, carPos.z - cameraPos.z).normalize();
      this.raycaster.set(cameraPos, direction);
      const intersects = this.raycaster.intersectObject(this.car.object3D, true);
      
      if (!this.isDriving && intersects.length > 0 && intersects[0].distance <= 5) {
        this.driveButton.style.display = 'block';
        this.driveButton.addEventListener('click', this.driveCar);
      } else {
        this.driveButton.style.display = 'none';
        this.driveButton.removeEventListener('click', this.driveCar);
      }
  
      if (this.isDriving) {
        this.leaveButton.style.display = 'block';
        this.leaveButton.addEventListener('click', this.leaveCar);
      } else {
        this.leaveButton.style.display = 'none';
        this.leaveButton.removeEventListener('click', this.leaveCar);
      }
    },
    driveCar: function () {
      this.isDriving = true;
      this.originalPosition = this.el.getAttribute('position');
      const carPos = this.car.getAttribute('position');
      this.el.setAttribute('position', {x: carPos.x, y: carPos.y + 3.5, z: carPos.z}); // Assume that the roof is 1 unit above the car's position
    },
    leaveCar: function () {
        this.isDriving = false;
        const carPos = this.car.getAttribute('position');
        this.el.setAttribute('position', {x: carPos.x - 2, y: 1.6, z: carPos.z}); // Assume you want to get off to the left of the car
      }      
  });
  