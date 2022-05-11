const router = require('express').Router();
const { Category, Question, Quiz } = require('../../models');

// Author: Mayur
// Purpose: Get route to fetch list of questions by categoryid and difficulty
// router.get('/:id/:difficulty', async (req, res) => {  
//     try {      
//        const questionData = await Question.findAll({
//          attributes: ['id', 'question_text', 'question_correct_answer',
//           'question_incorrect_answer'],
//           where: {
//              category_id: req.params.id
//              //difficulty: req.params.difficulty.toLowerCase(), 
//            },
//          //   order: sequelize.random(),         
//            limit: 10
//        });
//        const questions = questionData.map((question) => {return question.get({ plain: true})})    
//        res.status(200).json(questions);
//     } catch (err) {
//        console.log(err);
//        res.status(500).json(err);
//       }
//   });  

  // Purpose: Get route to fetch list of quizzes for category
router.get('/bycategory/:id', async (req, res) => {  
   try {      
      console.log(req.params.id);
      const quizData = await Quiz.findAll({
        attributes: ['id', 'quiz_name', 'quiz_description','account_id'],
         where: {
            category_id: req.params.id        
          },
          order: 
          ['quiz_name'],  
      });
      const quizzes = quizData.map((quiz) => {return quiz.get({ plain: true})})    
      res.status(200).json(quizzes);
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
     }
 });  
  // Author: Mayur
// Purpose: Get route to fetch random question of the day
router.get('/questionoftheday', async (req, res) => {  
   try {      
      const questionData = await QuestionBank.findAll({                 
          //order: sequelize.random(),       
          limit: 1
      });
      const questions = questionData.map((question) => {return question.get({ plain: true})})    
      res.status(200).json(questions);
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
     }
 });  
module.exports = router;
