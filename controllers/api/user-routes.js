const router = require('express').Router();
const { Account } = require('../../models');


//login landing page
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(404).json(err)
    }
}
);

//signup landing page
router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(404).json(err)
    }
}
);

//signup
router.post('/signup', async (req, res) => {
    try {
        const createAccount = Account.create({
            name: req.body.username,
            password: req.body.password
        });


        req.session.save(() => {

            //keeps track of who is logged in
            req.session.account = req.body.username;

            req.status(200).json(createAccount);
        });
    } catch (err) {
        console.log(err);
        req.status(500).json(err);
    }

});

//login
router.post('/login', async (req, res) => {
    try {
        const userAccount = await Account.findOne({
            where: {
                name: req.body.username
            }
        });

        if (!userAccount) {
            res.status(400).json({ message: 'Incorrect name or password, try again' });
            return;
        }

        const isValid = await userAccount.checkPassword(req.body.password);

        if (!isValid) {
            res.status(400).json({ message: 'Incorrect name or password, try again' });
            return;
        }

        req.session.save(() => {

            //keeps track of who is logged in
            req.session.account = req.body.username;

            req.status(200).json(userAccount);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//logout


module.exports = router;
