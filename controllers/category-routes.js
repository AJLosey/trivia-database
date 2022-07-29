// Routes for home page goes here
const router = require('express').Router();
const { Category } = require('../models');

// // Import the custom middleware
const withAuth = require('../utils/auth');

// Author: Mayur
// Purpose: Get route to fetch single category record by id from database
router.get('/:id', withAuth, async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);
    const category = categoryData.get({ plain: true });
    res.render('category', { category, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

