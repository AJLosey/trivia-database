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
    const userAccount = await Account.findOne({
        where: {
            name: req.body.username
        }
    });
    if (userAccount) {
        res.status(500).json('This account already exists');
    } else {
        try {
            const createAccount = await Account.create({
                name: req.body.username,
                password: req.body.password
            });

            req.session.save(() => {
                //keeps track of who is logged in
                req.session.account = req.body.username;
                req.session.loggedIn = true;
                res.status(200).json(createAccount);
            });
            req.session.reload(function (err) {
                console.log(err)
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
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
            req.session.loggedIn = true;
            res.status(200).json(userAccount);
        });
        req.session.reload(function (err) {
            console.log(err)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;
