(function() {
  let questions = [{
    question: "Maria Joaquina comprou os seguintes materiais escolares: Uma borracha R$ 00,50; Um caderno R$5,00; Um apontador R$ 1,00; Uma tesoura R$ 2,00. Ao todo quanto Maria Joaquina gastou?",
    choices: ["R$ 8,00","R$ 8,25","R$ 9,00","R$ 8,50"],
    correctAnswer: 3
  }, {
    question: "Para a organização da tabela dos jogos da copa do mundo, os 48 países participantes foram divididos em 8 grupos com a mesma quantidade de times. Cada grupo ficou com?",
    choices: ["6 países","5 países","9 países","7 países"],
    correctAnswer: 0
  }, {
    question: "Na escola de Melissa foi realizado um baile de carnaval. Dos 754 alunos, faltaram 348. Quantos alunos foram ao baile?",
    choices: ["548 alunos","456 alunos","406 alunos","415 alunos"],
    correctAnswer: 2
  }, {
    question: "Um fazendeiro tinha 285 bois. Comprou mais 176 bois e depois vendeu 85 bois. Quantos bois esse fazendeiro tem agora?",
    choices: ["206","376","476","576"],
    correctAnswer: 1
  }, {
    question: "Para fazer um trabalho a professora Flávia dividiu as 3 turmas do 5 ano com 108 alunos em 4 grupos. Quantos grupos foram formados?",
    choices: ["25","26","27","24"],
    correctAnswer: 2
  }, {
    question: "Um sorveteiro vendeu 2.660 sorvetes em 7 dias. Quantos sorvetes vendeu por dia?",
    choices: ["380","390","400","589"],
    correctAnswer: 0
  }, {
    question: "Valéria tinha 248 figurinhas, colou 8 em cada página de um álbum. Quantas páginas tem seu álbum?",
    choices: ["21","51","41","31"],
    correctAnswer: 3
  },{
    question: "Um feirante guardou 3 centenas de laranjas em 6 caixotes. Quantas laranjas foram guardadas em cada caixote?",
    choices: ["50","40","60","80"],
    correctAnswer: 2
  },{
    question: "A diretora distribuiu 5.508 folhas de papel entre 6 classes de alunos da 5 série. Quantas folhas recebeu cada classe?",
    choices: ["854","542","365","918"],
    correctAnswer: 3
  },{
    question: "Num passeio da escola,os 260 alunos foram levados em 4 ônibus. Cada ônibus transportou o mesmo número de alunos. Quantos alunos foram em cada ônibus?",
    choices: ["60","64","62","65"],
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