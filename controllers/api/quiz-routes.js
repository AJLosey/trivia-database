const router = require('express').Router();
const { Category, Question, Quiz, QuizQuestion } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Author: Mayur
// Purpose: Get route to fetch list of questions by categoryid and difficulty
router.get('/category/:categoryId/quiz/:quizId', async (req, res) => {
  try {
    const questionData = await Question.findAll({
      attributes: ['id', 'question_text', 'question_correct_answer',
        'question_incorrect_answers'],
      include: [{
        model: QuizQuestion,
        where: { quiz_id: req.params.quizId }
        //model: Quiz,
      }],
      where: {
        category_id: req.params.categoryId,
        //difficulty: req.params.difficulty.toLowerCase(), 
      },
      //   order: sequelize.random(),         
      limit: 10
    });
    const questions = questionData.map((question) => { return question.get({ plain: true }) })
    res.status(200).json(questions);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Purpose: Get route to fetch list of quizzes for category
router.get('/bycategory/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const quizData = await Quiz.findAll({
      attributes: ['id', 'quiz_name', 'quiz_description', 'account_id'],
      where: {
        category_id: req.params.id
      },
      order:
        ['quiz_name'],
    });
    const quizzes = quizData.map((quiz) => { return quiz.get({ plain: true }) })
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
    const questionData = await Question.findAll({
      order: sequelize.random(),
      limit: 1
    });
    const questions = questionData.map((question) => { return question.get({ plain: true }) })
    res.status(200).json(questions);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Purpose: post route to add new quiz
router.post('/', withAuth, async (req, res) => {
  const body = req.body;
  try {
    const newQuizJson = {
      "quiz_name": req.body.quiz_name,
      "quiz_description": req.body.quiz_description,
      "category_id": req.body.category_id,
      "account_id": req.body.account_id,
    }
    const newQuiz = await Quiz.create(newQuizJson);
    res.json(newQuiz);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Purpose: post route to add quiz question
router.post('/question', withAuth, async (req, res) => {
  const body = req.body;
  try {
    const newQuestionJson = {
      "question_text": req.body.question,
      "question_correct_answer": req.body.correct_answer,
      "question_incorrect_answers": req.body.incorrect_answers,
      "category_id": req.body.category_id,
      "account_id": req.body.account_id,
    }
    const newQuestion = await Question.create(newQuestionJson);
    const question_id = newQuestion.id;
    const newQuizQuestionJson = {
      "quiz_id": req.body.quiz_id,
      "question_id": question_id
    }
    await QuizQuestion.create(newQuizQuestionJson);
    res.json(newQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
