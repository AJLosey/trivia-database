const router = require('express').Router();

//const apiRoutes = require('./api/'); // Backend calls
const homeRoutes = require('./home-routes.js'); // home page
const categoryRoutes = require('./category-routes.js'); // category page
const dashboardRoutes = require('./dashboard-routes.js'); // user dashboard pages
const userRoutes = require('./api/user-routes'); // login-signup page
//const createQuiz = require('./create-quiz-routes');


router.use('/', homeRoutes);
router.use('/category/', categoryRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
//router.use('/createquiz', createQuiz)

module.exports = router;
