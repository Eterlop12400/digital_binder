const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = Router();

// Require Model
const { User } = require('../models');

const saltRounds = 10;

router.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName, bio } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);

    try {
        const [userData] = await User.findAll({
            where: {
                email,
            },
        });

        if (userData) {
            res.status(422).send({ error: 'Email is already in use!' });
        } else if (email.trim() === '' || firstName.trim() === '' || lastName.trim() === '' || bio.trim() === '' || password.trim() === '') {
            return res.status(400).send({ error: 'Invalid Request!' });
        } else {
            const user = await User.create({
                email,
                password: hash,
                firstName,
                lastName,
                bio,
            });

            const token = jwt.sign({ id: user.id }, process.env.SECRET);
            res.json({ token, loggedIn: true });
        }
    } catch (error) {
        return res.status(422).send(error.message);
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).send({ error: 'You need an email and password' });
    }

    try {
        const [user] = await User.findAll({
            where: {
                email,
            },
        });

        if (!user) {
            res.status(422).send({ error: 'You need an email and password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(422).send({ error: 'You need an email and password' });
        }

        const token = jwt.sign({ id: user.id, firstName: user.firstName, lastName: user.lastName }, process.env.SECRET);
        res.json({ token, loggedIn: true });
    } catch (error) {
        console.log('ERROR >>>', error);
    }
});

module.exports = router;
