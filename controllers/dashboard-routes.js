// Routes for user dashboard goes here
const router = require('express').Router();
const { Dashboard } = require('../models');
// const router = require('express').Router();
// const { Post } = require('../models/'); // change model
// const withAuth = require('../utils/auth');
router.get('/', async (req, res) => {  
    const dashboard =  req.params.dashboard
    res.render('dashboard', {});
 });   
// home page for user dashboard
// router.get('/', withAuth, async (req, res) => {  
// });    

// module.exports = router;