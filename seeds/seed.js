const sequelize = require('../config/connection');
const { Account, Category, Quiz, Question, QuizQuestion } = require('../models');
const Trivia = require('trivia-api')
const trivia = new Trivia({ encoding: 'url3986' });

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // Step 1: create admin user
  const adminUser = {
    "name": "admin",
    "password": "administrator"
  }
  Account.create(adminUser)
    .then(res => {
      userId = res.uniqno;
      // Step 2: insert categories from API   
      let categoriesarray = [];
      trivia.getCategories()
        .then(categories => {
          categories.trivia_categories.forEach(category => {
            // json to insert into category table
            const categoryJson = {
              "id": category.id,
              "category_name": category.name
            };
            categoriesarray.push(categoryJson);
          })
          // store categories from API call to database
          Category.bulkCreate(categoriesarray)
            .then(res => {
              fetchQuestionsByCategory(userId, categoriesarray);
            })

        })
    })
};

function fetchQuestionsByCategory(userId, categoriesarray) {
  // iterate thru categoriesarray and run api for answers of each
  for (let index = 0; index < categoriesarray.length; index++) {
    let categoryId = categoriesarray[index].id;
    let category_name = categoriesarray[index].category_name;
    questions(categoryId, category_name, userId, 'multiple', 'easy');
    questions(categoryId, category_name, userId, 'multiple', 'medium');
    questions(categoryId, category_name, userId, 'multiple', 'hard');

  }
}

const questions = (categoryId, category_name, userId, type, difficulty) => {
  let options = {
    type: type,
    amount: 10,
    difficulty: difficulty,
    category: categoryId
  };
  let questionsarray = [];
  let questionTableArray = [];
  trivia.getQuestions(options)
    .then(results => {
      // create record in quiz table
      const quizRecord = {
        "quiz_name": difficulty.charAt(0).toUpperCase() + difficulty.substr(1).toLowerCase(),
        "quiz_description": "",
        "category_id": categoryId,
        "account_id": userId
      }
      Quiz.create(quizRecord)
        .then(res => {
          quizId = res.uniqno;
          // iterate over questions
          results.results.forEach(question => {
            const questionTableJson = {
              "question_text": question.question,
              "question_correct_answer": question.correct_answer,
              "question_incorrect_answers": question.incorrect_answers,
              "category_id": categoryId,
              "account_id": userId
            };
            Question.create(questionTableJson)
              .then(res => {
                question_id = res.id; //uniqno;
                const quizQuestionRecord = {
                  "quiz_id": quizId,
                  "question_id": question_id
                }
                QuizQuestion.create(quizQuestionRecord)

              })

            //questionTableArray.push(questionTableJson);  
          });
          // store categories from API call to databas e

        })

    })
}

seedDatabase();
