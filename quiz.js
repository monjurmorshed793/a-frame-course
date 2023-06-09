AFRAME.registerComponent('quiz-option', {
    schema: {
      correct: {type: 'boolean', default: false},
      nextQuestion: {type: 'string'}
    },
  
    update: function () {
        this.el.addEventListener('click', this.onClick.bind(this));
      },
  
      onClick: function () {
        if (this.data.correct) {
          let scoreElement = document.getElementById('score');
          let currentScore = parseInt(scoreElement.textContent.split(' ')[1]);
          scoreElement.textContent = 'Score: ' + (currentScore + 1);
        }
      
        let currentQuestion = this.el.parentNode;
        let scene = document.querySelector('a-scene');
        scene.removeChild(currentQuestion);
      
        let nextQuestion = document.getElementById(this.data.nextQuestion);
        nextQuestion.setAttribute('visible', true);
      
        if (this.data.nextQuestion === 'end') {
          document.getElementById('finalScore').setAttribute('text', 'value', 'Your final score is: ' + document.getElementById('score').textContent.split(' ')[1]);
        }
      },
  
    removeEventListeners: function (questionElement) {
      let clickableElements = questionElement.querySelectorAll('.clickable');
      clickableElements.forEach((element) => {
        let el = element;
        let newEl = el.cloneNode(true);
        el.parentNode.replaceChild(newEl, el);
      });
    }
});
