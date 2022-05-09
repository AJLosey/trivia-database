// Routes for home page goes here
const router = require('express').Router();
// const { Post, Comment, User } = require('../models/'); // change model names
// // Import the custom middleware
// const withAuth = require('../utils/auth'); // 

// get for home page
 router.get('/:category', async (req, res) => {  
    const categoryName =  req.params.category
    res.render('category', { category: categoryName});
 });    

// // show login page to new user, logged in redirect to home page
// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//       res.redirect('/');
//       return;
//     }
  
//     res.render('login');
//   });
  
//   // show signup page to new user, logged in redirect to home page
//   router.get('/signup', (req, res) => {
//     if (req.session.loggedIn) {
//       res.redirect('/');
//       return;
//     }
  
//     res.render('signup');
//   });
  
   module.exports = router;
  