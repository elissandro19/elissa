(function() {
  let questions = [{
    question: "Sabendo que log3(7x - 1) = 3 e que log2(y3 + 3) = 7 pode-se afirmar que logy(x2 + 9) é igual a:",
    choices: ["6","2","3","5"],
    correctAnswer: 1
  }, {
    question: "Numa calculadora científica, ao se digitar um número positivo qualquer e, em seguida, se apertar a tecla log, aparece, no visor, o logaritmo decimal do número inicialmente digitado.Digita-se o número 10.000 nessa calculadora e, logo após, aperta-se, N vezes, a tecla log, até aparecer um número negativo no visor. Então, é CORRETO afirmar que o número N é igual a:",
    choices: ["1","3","4","5"],
    correctAnswer: 1
  }, {
    question: "Se loga b = 3 e logab c = 4, então loga c é:",
    choices: ["14","24","16","5"],
    correctAnswer: 2
  }, {
    question: "Se log5 x = 2 e log10 y = 4, então log20 y/x é:",
    choices: ["2","4","6","10"],
    correctAnswer: 0
  }, {
    question: "Se 10x = 20y , atribuindo 0,3 para log 2 , então o valor de x/y é:",
    choices: ["0,3","0,7","1","1,3"],
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
    modal.setContent('1)B<br>2)B<br>3)C<br>4)A<br>5)D');
    
    
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