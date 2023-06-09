AFRAME.registerComponent('entity-interaction', {
  init: function () {
    this.entities = Array.from(document.querySelectorAll('.entity'));
    this.infoLayers = Array.from(document.querySelectorAll('.info-layer'));
    this.lastPosition = { x: 0, y: 1.6, z: 0 };  // Initial position of the camera
    this.closeButtonHandler = null;

    this.entities.forEach((entity, i) => {
      entity.addEventListener('click', () => {
        this.lastPosition = this.el.object3D.position.clone(); 
        const entityPos = entity.getAttribute('position');
        this.el.setAttribute('animation', {
          property: 'position',
          to: entityPos.x + ' ' + (entityPos.y + 1) + ' ' + (entityPos.z + 2),
          dur: 1000,
        });

        this.infoLayers[i].style.display = 'block';
        // Remove existing event listener
        if (this.closeButtonHandler !== null) {
          this.infoLayers[i].querySelector('.close-button').removeEventListener('click', this.closeButtonHandler);
        }

        // Store new event listener
        this.closeButtonHandler = () => {
          this.el.setAttribute('animation', {
            property: 'position',
            to: this.lastPosition.x + ' ' + this.lastPosition.y + ' ' + this.lastPosition.z,
            dur: 1000,
          });
          this.infoLayers[i].style.display = 'none';
        };

        // Add new event listener
        this.infoLayers[i].querySelector('.close-button').addEventListener('click', this.closeButtonHandler);
      });
    });
  },
});
