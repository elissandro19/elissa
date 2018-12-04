(function() {
  let questions = [{
    question: "Sejam x e y números tais que os conjuntos {0, 7, 1} e {x, y, 1} são iguais. Então, podemos afirmar que:",
    choices: ["x = 0 e y = 5","x + y = 7","x = 0 e y = 1","x + 2 y = 7"],
    correctAnswer: 1
  }, {
    question: "Num colégio de 100 alunos, 80 gostam de sorvete de chocolate, 70 gostam de sorvete de creme e 60 gostam dos dois sabores. Quantos não gostam de nenhum dos dois sabores?",
    choices: ["0","10","20","30"],
    correctAnswer: 1
  }, {
    question: "Uma prova com duas questões foi dada a uma classe de quarenta alunos. Dez alunos acertaram as duas questões, 25 acertaram a primeira e 20 acertaram a segunda questão. Quantos alunos erraram as duas questões?",
    choices: ["40","10","0","5"],
    correctAnswer: 3
  }, {
    question: "Sabendo que A = {0, 1, 2, 3, 4, 5, 6}, B = {6, 7, 8, 9} e C = {2, 4, 6, 8, 10}, quais são os elementos do conjunto (A∩B)UC?",
    choices: ["Os mesmos do conjunto A","Os mesmos do conjunto B","Os mesmos do conjunto C","{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}"],
    correctAnswer: 2
  }, {
    question: "(PUC) Numa pesquisa de mercado, verificou-se que 15 pessoas utilizam pelo menos um dos produtos A ou B. Sabendo que 10 dessas pessoas não usam o produto B e que 2 dessas pessoas não usam o produto A, qual é o número de pessoas que utilizam os produtos A e B?",
    choices: ["0","2","3","4"],
    correctAnswer: 2
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
    modal.setContent('<iframe width="100%" height="400" src="https://www.youtube.com/embed/AN9ctgnyijw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
    
    
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