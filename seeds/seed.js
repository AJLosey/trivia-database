const sequelize = require('../config/connection');
const { Account, Category, QuestionBank,
  Quiz, Question, QuizQuestions } = require('../models');
const Trivia = require('trivia-api')
const trivia = new Trivia({ encoding: 'url3986' });

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  let categoriesarray = [];
  trivia.getCategories()
    .then(categories => {
      categories.trivia_categories.forEach(category => {
        const categoryJson = {
          "id": category.id,
          "category_name": category.name
        };
        //Category.create(categoriesarray);    
        let categoryId = category.id;
        // fetch questions
        questions(category.id, 'multiple', 'easy');
        questions(category.id, 'multiple', 'medium');
        questions(category.id, 'multiple', 'hard');
        categoriesarray.push(categoryJson);
      })
      // store categories from API call to database
      Category.bulkCreate(categoriesarray);
    })

};

const questions = (categoryId, type, difficulty) => {
  let options = {
    type: type,
    amount: 10,
    difficulty: difficulty,
    category: categoryId
  };
  let questionsarray = [];
  trivia.getQuestions(options)
    .then(results => {
      results.results.forEach(question => {
        const questionJson = {
          "categoryid": categoryId,
          "questiontype": question.type,
          "difficulty": question.difficulty,
          "question": question.question,
          "correct_answer": question.correct_answer,
          "incorrect_answers": question.incorrect_answers,
        };
        questionsarray.push(questionJson);
      });
      // store categories from API call to database
      QuestionBank.bulkCreate(questionsarray);
    })
}
seedDatabase();
