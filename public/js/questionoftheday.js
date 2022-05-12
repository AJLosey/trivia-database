const questionOfTheDayHeadingEl = $('#headingquestionoftheday');
const questionOfTheDayChoicesEl = $('#choicesquestionoftheday');
const questionOfTheDayOutputEl = $('#outputquestionoftheday');

let correct_answer;
let userchoice_answer;
fetch('/api/quiz/questionoftheday')    
.then(function (response) {        
    if (response.ok) {
        response.json().then(function (question) { 
            questionOfTheDayHeadingEl.html(question[0].question_text);
            let answerChoices = [];
            correct_answer = question[0].question_correct_answer;
            answerChoices.push(question[0].question_correct_answer);
            question[0].question_incorrect_answers.forEach(incorrect_answer => {
                answerChoices.push(incorrect_answer);
            });
            // shuffle answerchoices
            answerChoices = answerChoices.sort(() => Math.random() - 0.5);
            for (let answer = 0; answer < answerChoices.length ; answer++) {
               let answerChoiceEl = `<div class="form-check">
               <input class="form-check-input" type="radio" 
               onclick = "getUserAnswer('${answerChoices[answer]}')" 
               name="flexRadio" value="${answerChoices[answer]}" id="flexRadio${answer}">
               <label class="form-check-label" for="flexRadio1"> ${answerChoices[answer]} </label>
           </div>`;           
           questionOfTheDayChoicesEl.append(answerChoiceEl);
             }
             questionOfTheDayChoicesEl.append(`<button type="button" class="btn btn-lg" 
             onclick="validatequestionoftheday()" id="submit-btn">Submit Answer</button>`);
        });
        
    } else {
        questionOfTheDayHeadingEl.text("There was an error occurred while connecting to REST API. Please try again!");
    }
  })
  .catch(function (error) {
    questionOfTheDayHeadingEl.text("There was an error occurred while connecting to REST API. Please try again!");
  });

  function getUserAnswer(useranswer) 
  {
    userchoice_answer = useranswer;
  }
  function validatequestionoftheday()
  {
    questionOfTheDayOutputEl.text(''); // reset
    if(userchoice_answer === correct_answer)
    {
        questionOfTheDayOutputEl.append(`<p id="outputquestionoftheday" class="text-white mt-2">Your answer was correct!</p>`);        
    }
    else{
        questionOfTheDayOutputEl.append(`<p id="outputquestionoftheday" class="text-white  mt-2">
        Your answer was wrong! The correct answer is: '${correct_answer}'</p>`);        
    }
  }