const sequelize = require('../config/connection');
const { Account, Category, Quiz, Question, QuizQuestion, QuestionBank} = require('../models');
const Trivia = require('trivia-api');
const { response } = require('express');
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
    userId = res.id;   
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

function fetchQuestionsByCategory(userId, categoriesarray)
{    
        // iterate thru categoriesarray and run api for answers of each
    for (let index = 0; index < categoriesarray.length; index++) {
        let categoryId = categoriesarray[index].id;
        let category_name = categoriesarray[index].category_name;
          questions(categoryId, userId, 'multiple', 'easy');
          questions(categoryId, userId, 'multiple', 'medium');
          questions(categoryId, userId, 'multiple', 'hard');
        
      }
}

const questions = (categoryId, userId, type, difficulty) => {
    let options = {
      type: type,
      amount: 10,
      difficulty: difficulty,
      category: categoryId
    };    
    let questionsarray = [];
    let questionTableArray = [];
    let quizId;
    let question_id;
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
          .then(resquizId => {
                quizId = resquizId.id;  
               
                //console.log(resquiz);                
// iterate over questions
                results.results.forEach(question => {
                    const questionTableJson = {
                    "question_text": question.question,
                    "question_correct_answer": question.correct_answer,
                    "question_incorrect_answers": question.incorrect_answers,                        
                    "category_id": categoryId,
                    "account_id": userId
                };          
                if(quizId==1 && difficulty=="medium")              
                {
                  console.log(questionTableJson);
                  process.exit();
                }
                Question.create(questionTableJson)
                .then(resquestionId => {
                     question_id = resquestionId.id;                

//                    question_id = resquestion.uniqno;
                    const quizQuestionRecord = {
                      "quiz_id": quizId,
                      "question_id": question_id
                    }
                    //console.log(quizQuestionRecord);
                    QuizQuestion.create(quizQuestionRecord)

                })

                //questionTableArray.push(questionTableJson);  
                });        
                // store categories from API call to databas e
               
          })  
         
      })   
  }

seedDatabase();
