
const router = require('express').Router();

const userRoutes = require('./user-routes.js');

const categoryRoutes = require('./category-routes');
const quizRoutes = require('./quiz-routes');

router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/quiz', quizRoutes);

module.exports = router;