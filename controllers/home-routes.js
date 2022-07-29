// Routes for home page goes here
const router = require('express').Router();
// const { Post, Comment, User } = require('../models/'); // change model names
const Category = require('../models/category');
// // Import the custom middleware


// Author: Mayur
// Purpose: Get route to fetch list of all categories order by category_name from database
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      order:
        ['category_name'],
      attributes: ['id', 'category_name']
    });
    const categories = categoryData.map((category) => { return category.get({ plain: true }) })
    console.log(categories);
    res.render('index', {
      categories,
      loggedIn: req.session.loggedIn,
    });

    console.log(req.session.loggedIn)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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

module.exports = router;
