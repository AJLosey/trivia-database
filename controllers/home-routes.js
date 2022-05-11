// Routes for home page goes here
const router = require('express').Router();
const Category  = require('../models/category');
// // Import the custom middleware
 const withAuth = require('../utils/auth'); 

// Author: Mayur
// Purpose: Get route to fetch list of all categories order by category_name from database
 router.get('/', async (req, res) => {  
  try {
    const categoryData = await Category.findAll({     
      order: 
        ['category_name'],   
      attributes: ['id','category_name']   
    });
    const categories = categoryData.map((category) => {return category.get({ plain: true})});        
    res.render('index', { 
      categories,
      loggedIn: req.session.loggedIn,
     });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }   
 });    

// // show login page to new user, logged in redirect to home page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
//   // show signup page to new user, logged in redirect to home page
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });
  
   module.exports = router;
  