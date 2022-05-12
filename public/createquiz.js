//globals
quizName = '';
quizDesc = '';
catName = ''
accountName = ''
questionArray = []
userId = ''

//to do! somehow determine category name or category id

const createquiz = function () {
    document.querySelector('#start-btn').addEventListener('click', startQuizCreate);

}

const startQuizCreate = async function () {
    userId = await fetch('/api/user/id', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    quizName = document.querySelector('#quiz-name').innerHTML;
    quizDesc = document.querySelector('#quiz-description').innerHTML;
    //something that allows us to change the handlebars view? re-render the page and trigger some if statement so we can fill in questions?
    document.querySelector('#next-btn').addEventListener('click', addQuestions);
    document.querySelector('#finish-btn').addEventListener('click', submitQuiz);
}

const addQuestion = function () {

    questionText = document.querySelector('#question-text').innerHTML;
    rightAnswer = document.querySelector('#correct').innerHTML;
    wrong1 = document.querySelector('#wrong1').innerHTML;
    wrong2 = document.querySelector('#wrong2').innerHTML;
    wrong3 = document.querySelector('#wrong3').innerHTML;


    let newQuestion = {
        question_text: questionText,
        question_correct_answer: rightAnswer,
        question_incorrect_answers: [wrong1, wrong2, wrong3],
        account_id: userId
    };

    questionArray.push(newQuestion);

    document.querySelector('#question-text').innerHTML = '';
    document.querySelector('#correct').innerHTML = '';
    document.querySelector('#wrong1').innerHTML = '';
    document.querySelector('#wrong2').innerHTML = '';
    document.querySelector('#wrong3').innerHTML = '';
}

const submitQuiz = fetch('/api/createquiz', {
    method: 'POST',
    body: {
        quizName: quizName,
        quizDesc: quizDesc,
        catName: catName,
        userId: userId,
        questionArray: questionArray
    },
    headers: { 'Content-Type': 'application/json' }
})







document.querySelector('#next-btn').addEventListener('click', addQuestions);




document.querySelector('#new-quiz-btn').addEventListener('click', createquiz);