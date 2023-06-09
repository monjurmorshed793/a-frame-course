AFRAME.registerComponent('my-dynamic-body', {
    schema: {
      shape: {type: 'string', default: 'box'}
    },
    init: function () {
      if (this.data.shape === 'box') {
        this.el.setAttribute('geometry', 'primitive: box');
      } else if (this.data.shape === 'sphere') {
        this.el.setAttribute('geometry', 'primitive: sphere; radius: 0.5');
      }
      this.el.setAttribute('dynamic-body', {});
    }
  });
  
  AFRAME.registerComponent('my-static-body', {
    init: function () {
      this.el.setAttribute('geometry', 'primitive: plane; height: 100; width: 100');
      this.el.setAttribute('static-body', {});
    }
  });
  