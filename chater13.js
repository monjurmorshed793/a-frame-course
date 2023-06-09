AFRAME.registerComponent('directional-light', {
    schema: {
      color: { default: '#FFF' },
      intensity: { default: 1 }
    },
  
    init: function () {
      const data = this.data;
      const el = this.el;
  
      const light = document.createElement('a-entity');
      light.setAttribute('light', `type: directional; color: ${data.color}; intensity: ${data.intensity}`);
  
      el.appendChild(light);
    }
  });

  AFRAME.registerComponent('point-light', {
    schema: {
      color: { default: '#FFF' },
      intensity: { default: 1 },
      distance: { default: 0 }
    },
  
    init: function () {
      const data = this.data;
      const el = this.el;
  
      const light = document.createElement('a-entity');
      light.setAttribute('light', `type: point; color: ${data.color}; intensity: ${data.intensity}; distance: ${data.distance}`);
  
      el.appendChild(light);
    }
  });
  
  AFRAME.registerComponent('spot-light', {
    schema: {
      color: { default: '#FFF' },
      intensity: { default: 1 },
      distance: { default: 0 },
      angle: { default: 60 },
      penumbra: { default: 0 }
    },
  
    init: function () {
      const data = this.data;
      const el = this.el;
  
      const light = document.createElement('a-entity');
      light.setAttribute('light', `type: spot; color: ${data.color}; intensity: ${data.intensity}; distance: ${data.distance}; angle: ${data.angle}; penumbra: ${data.penumbra}`);
  
      el.appendChild(light);
    }
  });
  