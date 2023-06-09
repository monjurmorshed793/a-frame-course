AFRAME.registerComponent('click-to-move', {
    init: function() {
        this.el.addEventListener('click', function() {
            var boxPos = this.getAttribute('position');
            var camera = document.querySelector('#camera');
            camera.setAttribute('animation', {
              property: 'position',
              to: boxPos.x + ' ' + (boxPos.y + 1) + ' ' + (boxPos.z + 2),
              dur: 1000,
              easing: 'easeInOutQuad'
            });
        });
    }
});