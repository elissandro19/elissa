(function() {
  let questions = [{
    question: "Das alternativas abaixo, assinale a única que é correta a respeito da função f(x) = – 2(x + 1)(2 – x).",
    choices: [" A função é do primeiro grau e é decrescente, pois a = – 2.","A função é do segundo grau e possui concavidade voltada para baixo, pois a = – 2."," A função é do segundo grau e possui concavidade voltada para cima, pois a = 2.","A função é do primeiro grau e é crescente, pois a = 2."],
    correctAnswer: 2
  }, {
    question: "A respeito da função f(x) = – 4x2 + 100, assinale a alternativa que seja o resultado da soma entre as coordenadas x e y do vértice.",
    choices: ["50","100","150","200"],
    correctAnswer: 1
  }, {
    question: "Qual é a soma das raízes da função f(x) = x2 + 8x – 9?",
    choices: ["-8","8","9","1"],
    correctAnswer: 0
  }, {
    question: "Assinale a alternativa correta a respeito do gráfico de uma função do segundo grau.",
    choices: ["Quando o discriminante de uma função do segundo grau é positivo e ela possui ponto de máximo, o valor do coeficiente a também é positivo.","Quando o discriminante de uma função do segundo grau é negativo e ela possui ponto de máximo, pode-se afirmar, com certeza, que ela possui 2 raízes reais.","Quando o discriminante de uma função do segundo grau é negativo e ela possui ponto de mínimo, pode-se afirmar, com certeza, que o coeficiente a é negativo.","Quando o discriminante de uma função do segundo grau é positivo e ela possui ponto de mínimo, o valor do coeficiente a é positivo."],
    correctAnswer: 3
  }];
  
  let questionCounter = 0; //Tracks question number
  let selections = []; //Array containing user choices
  let quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Por Favor, Marque alguma alternativa !');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
    $('#fim').on('click', function (e) {
    e.preventDefault();
    $('#fim').hide();
  });
    
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
    $('#fim').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    let qElement = $('<div>', {
      id: 'question'
    });
    
    let header = $('<h2>Questão ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    let question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    let radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    let radioList = $('<ul>');
    let item;
    let input = '';
    for (let i = 0; i < questions[index].choices.length; i++) {
      
      input = '<div class="inputGroup"> <input id="radio' + i +'" name="answer" type="radio" value=' + i + ' /><label for="radio' + i +'">' + questions[index].choices[i] + '</label></div>';
      
      radioList.append(input);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        let nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        let scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
        $('#fim').show();
      }
    });
  }
    
    
  //Modal Final
    
    let modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['button'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2']
});
    modal.setContent('1)C<br>2)B<br>3)A<br>4)D');
    
    
    let final = document.querySelector('#fim');
    final.addEventListener('click', function(e){
        modal.open();
    });
      
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    let score = $('<p>',{id: 'question'});
    
    let numCorrect = 0;
    for (let i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Você acertou ' + numCorrect + ' questões de ' +
                 questions.length + '.');
    return score;
  }
})();