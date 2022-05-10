const router = require('express').Router();

// const apiRoutes = require('./api/'); // Backend calls
const homeRoutes = require('./home-routes.js'); // home page
const categoryRoutes = require('./category-routes.js'); // category page

//const dashboardRoutes = require('./dashboard-routes.js'); // user dashboard pages

router.use('/', homeRoutes);
router.use('/tag/', categoryRoutes);

module.exports = router;

// const router = require('express').Router();

// // const apiRoutes = require('./api/'); // Backend calls
// const homeRoutes = require('./home-routes.js'); // home page
// const categoryRoutes = require('./category-routes.js'); // category page
// const dashboardRoutes = require('./dashboard-routes.js');
// //const dashboardRoutes = require('./dashboard-routes.js'); // user dashboard pages

// router.use('/', homeRoutes);
// router.use('/tag/', categoryRoutes);
// router.use('/dashboard', dashboardRoutes);

// module.exports = router;
