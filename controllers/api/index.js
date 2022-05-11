const router = require('express').Router(); 

const categoryRoutes = require('./category-routes');
const quizRoutes = require('./quiz-routes');

router.use('/category', categoryRoutes);
router.use('/quiz', quizRoutes);

module.exports = router;