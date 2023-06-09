AFRAME.registerComponent('entity-interaction', {
    schema: {
      infoLayer: {type: 'string'},
    },
  
    init: function () {
      const camera = document.querySelector('#player');
      const infoLayer = document.querySelector(`#${this.data.infoLayer}`);
      let lastPosition = null;
      let closeButtonHandler = null;
  
      this.el.addEventListener('click', () => {
        lastPosition = camera.object3D.position.clone(); 
        const entityPos = this.el.getAttribute('position');
  
        camera.setAttribute('animation', {
          property: 'position',
          to: entityPos.x + ' ' + (entityPos.y + 1) + ' ' + (entityPos.z + 2),
          dur: 1000,
        });
  
        infoLayer.style.display = 'block';
  
        // Remove existing event listener
        if (closeButtonHandler !== null) {
          infoLayer.querySelector('.close-button').removeEventListener('click', closeButtonHandler);
        }
  
        // Store new event listener
        closeButtonHandler = () => {
          camera.setAttribute('animation', {
            property: 'position',
            to: lastPosition.x + ' ' + lastPosition.y + ' ' + lastPosition.z,
            dur: 1000,
          });
          infoLayer.style.display = 'none';
        };
  
        // Add new event listener
        infoLayer.querySelector('.close-button').addEventListener('click', closeButtonHandler);
      });
    },
  });
  