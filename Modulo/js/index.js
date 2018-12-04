(function() {
  let questions = [{
    question: "Resolva |3x – 1| = |2x + 6|.",
    choices: ["S = {5, -7}.","S = {– 1, 7}","S = { 1, 3}.","S = {– 3, 7}."],
    correctAnswer: 1
  }, {
    question: "Resolva a equação modular |4x + 3| = – 3x + 7",
    choices: ["S = { 0, 1/3}","S = {– 10, 1/7}","S = {– 10, 4/7}","S = { 15, 4}"],
    correctAnswer: 2
  }, {
    question: "Encontre o conjunto solução da equação modular |x + 1| + |2x – 1| = 3.",
    choices: ["S = {– 1, 1}.","S = { 10, 4}.","S = {– 3, 1}.","S = { 12, 5}."],
    correctAnswer: 0
  }, {
    question: "(PUC – SP) O conjunto solução S da equação |2x – 1| = x – 1 é:",
    choices: ["S = {0, 2/3}","S = {0, 1/3}","S = Ø","S = {0, – 1}"],
    correctAnswer: 2
  }, {
    question: "(UEPA) O conjunto solução da equação |x|² – 2|x| – 3 = 0 é igual a:",
    choices: ["S = {– 1, 3}","S = {– 3, 3}","S = {– 1, 1}"," S = {– 3, 1}"],
    correctAnswer: 1
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
    modal.setContent('1)B<br>2)C<br>3)A<br>4)C<br>5)A');
    
    
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