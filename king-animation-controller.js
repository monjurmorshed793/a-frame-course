AFRAME.registerComponent('animation-controller', {
    schema: {
      target: {type: 'string'},
      clip: {type: 'string'},
      toPosition: {type: 'string'},
    },
    init: function () {
      // Get the entities
      this.cameraEl = document.querySelector('#player');
      this.kingEl = document.querySelector('#'+this.data.target);
  
      // Flag to control the animation state
      this.isAnimationStarted = false;
  
      // Bind the method to stop the animation-mixer
      this.stopAnimationMixer = this.stopAnimationMixer.bind(this);
    },
    tick: function () {
      // If the animation has started, no need to check the camera position anymore
      if (this.isAnimationStarted) return;
  
      // Get the position of the camera and the box
      var cameraPos = this.cameraEl.getAttribute('position');
      var boxPos = this.el.getAttribute('position');
      var boxSize = this.el.getAttribute('geometry').primitive === 'box'
        ? this.el.getAttribute('geometry').depth
        : 1;
  
      // Check if the camera is inside the box (considering the box as a cube for simplicity)
      if (Math.abs(cameraPos.x - boxPos.x) < boxSize/2 && 
          Math.abs(cameraPos.y - boxPos.y) < boxSize/2 &&
          Math.abs(cameraPos.z - boxPos.z) < boxSize/2) {
  
        // If the camera is inside the box, start the animation
        this.kingEl.setAttribute('animation-mixer', `clip: ${this.data.clip}; timeScale: 1`);
        
        // Also animate the king's position to move it
        this.kingEl.setAttribute('animation', `property: position; to: ${this.data.toPosition}; dur: 2000;`);
        
        // Add a listener to stop the animation-mixer when the position animation ends
        this.kingEl.addEventListener('animationcomplete', this.stopAnimationMixer);
  
        this.isAnimationStarted = true;
      }
    },
    stopAnimationMixer: function() {
      this.kingEl.removeAttribute('animation-mixer');
    }
  });
  