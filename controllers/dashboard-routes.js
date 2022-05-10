// Routes for user dashboard goes here
const router = require('express').Router();
const { Post } = require('../models/'); // change model
const withAuth = require('../utils/auth');

// home page for user dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        res.render('dashboard');
    } catch (err) {
        res.status(404).json(err)
    }
}

});

//log out
router.post('/logout', (req, res) => {
    if (req.session.account) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;

