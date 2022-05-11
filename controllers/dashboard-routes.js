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
});


//route for changing password
router.put('/password', async (req, res) => {
    try {
        if (!req.body.newpass) {
            res.status(400).json({ message: 'user must input a new password' });
            return;
        }
        const updatedAccount = await Account.update({
            password: req.body.newpass
        }, {
            where: {
                name: req.session.account
            }
        });
        res.status(200).json(updatedAccount);
    } catch (err) {
        res.status(500).json(err);
    }
});


//display all quizzes assigned to user
router.get('/quizzes', async (req, res) => {
    try {
        const account = await Account.findAll({
            where: {
                name: req.session.account
            }
        });

        const userQuizzes = await Quiz.findAll({
            plain: true,
            where: {
                account_id: account.id
            }
        });

        res.render('dashboard', userQuizzes)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', (req, res) => {
    res.redirect("/createquiz")
})

//log out
router.post('/logout', (req, res) => {
    if (req.session.account) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;

