const quizSectionEl = $('#quizsection');
// global variables
let quizQuestions = [];
let userselectedanswers = [];

// Build quiz 
function buildQuizGame()
{
    // append question#1 to user screen
    displayQuestionToUser(0);
}   

// display questions one by one to frmcodequiz
function displayQuestionToUser(index)
{    
    const toalQuestions = quizQuestions.length;    
    quizSectionEl.text('');
    // prompt new question to user
    // Create parent div container
    quizSectionEl.append(`<h3 class='text-right mr-5'>QUESTION ${index + 1} of ${toalQuestions}`);
    let divContainerEl = $('<div class="container-fluid">');
    // Create div modal dialog that will append to parent divContainerEl
    let divModalDialogEl = $('<div class="modal-dialog">');
    // Create div modal content will append to parent divModalDialogEl
    let divModalContentEl = $('<div class="modal-content">');    
    //Create div modal header will append to parent divModalContentEl
     let divModalHeaderEl = $('<div class="modal-header">');    
    
    // append question to divModalHeaderEl
     let questionHeadingEl = $('<h3>');   
     questionHeadingEl.html(`Q. ${quizQuestions[index].question}`);   
     divModalHeaderEl.append(questionHeadingEl);
     divModalContentEl.append(divModalHeaderEl);
    // Create div modal body will append to parent divModalContentEl
     let divModalBodyEl = $('<div class="modal-body">');
     divModalBodyEl.attr('class', 'modal-body');         
     
    // filler
     divModalBodyEl.append('<div class="col-xs-3 5"> </div>');   

    // Create div quiz that will append to parent divModalBodyEl
    let divQuizEl = $('<div class="quiz" id="quiz" data-toggle="buttons">');      
    let answerChoices = [];
    answerChoices.push(quizQuestions[index].correct_answer);
    quizQuestions[index].incorrect_answers.forEach(incorrect_answer => {
        answerChoices.push(incorrect_answer);
    });
    // shuffle answerchoices
    answerChoices = answerChoices.sort(() => Math.random() - 0.5)
    
    // prompt list of answer choice to user
    for (let answer = 0; answer < answerChoices.length; answer++) {
       let answerChoiceEl =$(`<label class="element-animation${answer + 1} btn btn-lg btn-danger 
       btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right">
       </i></span> <input type="radio" onclick='validateanswer(${index}, this.value)' name="q_answer" value="${answerChoices[answer]}"> ${answerChoices[answer]}
       </label>`);        
       divQuizEl.append(answerChoiceEl);
    }
    // close all divs
    divModalBodyEl.append(divQuizEl);
    divModalContentEl.append(divModalBodyEl);
    divModalDialogEl.append(divModalContentEl);
    divContainerEl.append(divModalDialogEl);   
    // finally append everything to quizsection
    quizSectionEl.append(divContainerEl);
}    
// validate user answer and prompt next question
function validateanswer(questionno, useranswer){
    userselectedanswers[questionno] = useranswer;
     // check if questions left move to next or end game
     if(questionno<quizQuestions.length-1)      
     displayQuestionToUser(++questionno)
     else
     {     
      endthegame();     
     }

}
// end the game by calculating score and showing answers
function endthegame()
{
    quizSectionEl.text('');
    let pEl = $(`<h3 class="p-2 text-center">Thank you for playing the game!</h3>`);  
    //quizSectionEl.append(pEl);
    let toalQuestions = quizQuestions.length;        
    let totalCorrectAnswers = 0;
    let totalWrongAnswers = 0;
    for (let index = 0; index < toalQuestions; index++) {        
        if(quizQuestions[index].correct_answer == userselectedanswers[index])
        totalCorrectAnswers++;
        else
        totalWrongAnswers++;
    }    
    const userScore = (totalCorrectAnswers * 100) / toalQuestions;
    let scoreEl = $(`<h4 class="p-2 text-center">Your score is ${userScore} (${totalCorrectAnswers} 
        questions out of ${toalQuestions}).</h4>`);  
    quizSectionEl.html(`<h3 class="p-2 text-center">Thank you for playing the game!<br>
    Your score is ${userScore} (${totalCorrectAnswers} 
        questions out of ${toalQuestions}).</h3>`);
}
// generateQuestions wil call /api/quiz and get 10 questions from database
const generateQuestions = (categoryId, quizId) => {
    quizQuestions = []; // empty array
    const endpointURL = `/api/quiz/category/${categoryId}/quiz/${quizId}/`;    
    fetch(endpointURL)    
    .then(function (response) {        
    if (response.ok) {
        response.json().then(function (questions) { 
            
            for(let i = 0; i < questions.length; i++)
            {
                const questionJson =  {
                    question: questions[i].question_text,
                    correct_answer: questions[i].question_correct_answer,
                    incorrect_answers: questions[i].question_incorrect_answers                    
                };
                quizQuestions.push(questionJson);
            }                          
            buildQuizGame(); // show questions to user
        });
    } else {
        quizSectionEl.text("There was an error occurred while connecting to REST API. Please try again!");
    }
  })
  .catch(function (error) {
    quizSectionEl.text("There was an error occurred while connecting to REST API. Please try again!");
  });
}

// init will call generateQuestions for API call to fetch quesitons
function init(quizId, quizName){          
  const strs = document.URL.split('/');
  const categoryId = strs.at(-1);       
   // Create parent div container
   let divContainerEl = $('<div class="container-fluid">');
   // Create div modal dialog that will append to parent divContainerEl
   let divModalDialogEl = $('<div class="modal-dialog">');
   // Create div modal content will append to parent divModalDialogEl
   let divModalContentEl = $('<div class="modal-content">');    
   //Create div modal header will append to parent divModalContentEl
    let divModalHeaderEl = $('<div class="modal-header">');    
   
   // append question to divModalHeaderEl
    let questionHeadingEl = $('<h3>');   
    questionHeadingEl.html(`Quiz/Level: ${quizName}`);   
    divModalHeaderEl.append(questionHeadingEl);
    divModalContentEl.append(divModalHeaderEl);
   // Create div modal body will append to parent divModalContentEl
    let divModalBodyEl = $('<div class="modal-body">');
    divModalBodyEl.attr('class', 'modal-body');         
    
   // filler
    divModalBodyEl.append('<div class="col-xs-3 5"> </div>');   

   // Create div quiz that will append to parent divModalBodyEl
   let divQuizEl = $(`<p>You have 30 seconds to answer each question. The faster you answer, 
   the higher your score. When you are done, try again to beat your best score!</p>`);         
   // close all divs
   divModalBodyEl.append(divQuizEl);
   let buttonEl = `<button type="button" class="btn btn-success" 
   onclick="generateQuestions(${categoryId},'${quizId}')">Start This Quiz</button>`;
   divModalBodyEl.append(buttonEl);
   divModalContentEl.append(divModalBodyEl);
   divModalDialogEl.append(divModalContentEl);
   divContainerEl.append(divModalDialogEl);   
   // finally append everything to quizsection
   quizSectionEl.text('');
   quizListEl.text('');
   quizSectionEl.append(divContainerEl);
  //generateQuestions(id, difficulty);  
}
// listner for quiz start with user choice of difficulty
//document.querySelector('.playbtn').addEventListener('click', init);
// document.querySelector('#btneasy').addEventListener('click', init);
// document.querySelector('#btnmedium').addEventListener('click', init);
// document.querySelector('#btnhard').addEventListener('click', init);

// You have 30 seconds to answer each question. The faster you answer, the higher your score. When you are done, try again to beat your best score!