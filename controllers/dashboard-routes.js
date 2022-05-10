// Routes for user dashboard goes here
const router = require('express').Router();
const { Post } = require('../models/'); // change model
const withAuth = require('../utils/auth');

// home page for user dashboard
router.get('/', withAuth, async (req, res) => {
    if (!req.session.account) {
        res.status(401).redirect(/user)
    }
});


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

