const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))

// Require Model
let { User, Deck, Collection, Card} = require('../models')

/*
 This will return all users in the database.
 */
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();

        if (users !== null) {
            res.json(users);
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will take the email, first name, last name, bio, and password from the req.body and will then create a new user in the database using
 that information.
 */
router.post('/', async (req, res, next) => {
    try {
        const {email, firstName, lastName, bio, password} = req.body;

        if (email.trim() !== '' && firstName.trim() !== '' && lastName.trim() !== '' && bio.trim() !== '' && password.trim() !== '') {
            const user = await User.create({email, firstName, lastName, bio, password});
            res.json(user);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will take the email, first name, last name, bio, and password from the req.body and will then update the user using that information where
 the ID being passed in the URL matches the user in the database.
 */
router.post('/:id', async (req, res, next) => {
    try {
        const { email, firstName, lastName, bio, password } = req.body;
        const { id } = req.params;

        if (email.trim() !== '' && firstName.trim() !== '' && lastName.trim() !== '' && bio.trim() !== '' && password.trim() !== '') {
            const user = await User.update({ email, firstName, lastName, bio, password },{
                where: { id }
            });

            res.json(user);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will find a user in the database with a primary key based on the id that is in the url.
 */
router.get('/:id', async (req, res, next) => {
    try {
        const users = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Collection,
                    include: [Card]
                },
                {
                    model: Deck,
                    include: [Card]
                },
            ]
        })
        res.json(users);
    } catch (err) {
        next(err);
    }
});

/*
 This will delete the user from the database based on the ID that was passed in.
 */
router.get('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params
        await User.destroy({
            where: { id }
        })

        res.json({'success': true})
    } catch (err) {
        next(err);
    }
});

module.exports = router