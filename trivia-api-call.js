const Trivia = require('trivia-api')
const trivia = new Trivia({ encoding: 'url3986' });
trivia.getCategories()
    .then(console.log)
    .catch(console.error);
let options = {
    type: 'multiple',
    amount: 10,
    difficulty: 'hard'
};
trivia.getQuestions(options)
    .then(questions => console.log(questions))
    .catch(console.error);