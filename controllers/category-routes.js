// Routes for home page goes here
const router = require('express').Router();
const Category  = require('../models/category');
const QuestionBank  = require('../models/questionbank');
// // Import the custom middleware
const withAuth = require('../utils/auth'); // 

// Author: Mayur
// Purpose: Get route to fetch single category record by id from database
 router.get('/:id', async (req, res) => {  
   try {
      const categoryData = await Category.findByPk(req.params.id);
      const category = categoryData.get({ plain: true }); 
      res.render('category', { category, loggedIn: req.session.loggedIn });
     } catch (err) {
      console.log(err);
      res.status(500).json(err);
     }
 });    

// Author: Mayur
// Purpose: Get route to fetch list of questions by categoryid and difficulty
 router.get('/:id/:difficulty', async (req, res) => {  
   try {      
      const questionData = await QuestionBank.findAll({
         where: {
            categoryid: req.params.id,
            difficulty: req.params.difficulty.toLowerCase(), 
          }
      });
      const questions = questionData.map((question) => {return question.get({ plain: true})})    
      res.render('category', { questions, loggedIn: req.session.loggedIn });
     } catch (err) {
      console.log(err);
      res.status(500).json(err);
     }
 }); 
 
module.exports = router;
  