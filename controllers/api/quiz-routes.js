const router = require('express').Router();
const { Category, QuestionBank } = require('../../models');

// Author: Mayur
// Purpose: Get route to fetch list of questions by categoryid and difficulty
router.get('/:id/:difficulty', async (req, res) => {  
    try {      
       const questionData = await QuestionBank.findAll({
          where: {
             categoryid: req.params.id,
             difficulty: req.params.difficulty.toLowerCase(), 
           },
         //   order: sequelize.random(),         
           limit: 10
       });
       const questions = questionData.map((question) => {return question.get({ plain: true})})    
       res.status(200).json(questions);
    } catch (err) {
       console.log(err);
       res.status(500).json(err);
      }
  });  

module.exports = router;
