// Routes for home page goes here
const router = require('express').Router();
const { Home } =  require('../models');
// const { Post, Comment, User } = require('../models/'); // change model names
// // Import the custom middleware
// const withAuth = require('../utils/auth'); // 

// get for home page
 router.get('/', async (req, res) => {  
    res.render('index','');
 });    

// // show login page to new user, logged in redirect to home page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
  
    res.render('login');
  });
  
//   // show signup page to new user, logged in redirect to home page
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/signup');
      return;
    }
  
    res.render('signup');
  });
  
// router.get('/:category', (req, res) => {
//   res.redirect('/category', '');
// });

// router.get('/:dashboard', (req, res) => {
//   res.redirect('/dashboard', '');
// }); 
   module.exports = router;
