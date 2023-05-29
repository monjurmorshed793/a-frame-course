AFRAME.registerComponent('start-animation', {
    schema: {
      animation1: {type: 'string', default: ''},
      animation2: {type: 'string', default: ''},
      animation3: {type: 'string', default: ''}
    },
    init: function () {
      var el = this.el;
      var data = this.data;
  
      // Register an event listener to start the first animation
      el.addEventListener('click', function() {
        
      });
  
      // Register an event listener to start the next animation when each animation completes
      el.addEventListener('animationcomplete__1', function() {
        
      });
      el.addEventListener('animationcomplete__2', function() {
       
      });
    }
  });
  