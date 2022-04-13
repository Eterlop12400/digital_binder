const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))

// Require Model
let { Deck, Card } = require('../models')

/*
 This will return all decks in the database.
 */
router.get('/', async (req, res, next) => {
    try {
        const decks = await Deck.findAll();

        if(decks !== null) {
            res.json(decks);
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will take the name, description, color, and userId from the req.body and will then create a deck using that information.
 */
router.post('/', async (req, res, next) => {
    try {
        const { name, description, color, userId } = req.body;

        if (name.trim() !== '' && description.trim() !== '' && color.trim() !== '' && userId !== null) {
            const deck = await Deck.create({name, description, color, userId});
            res.json(deck);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will take the name, description, color, and userId from the req.body and will then update the deck using that information where
 the ID being passed in the URL matches the user in the database.
 */
router.post('/:id', async (req, res, next) => {
    try {
        const { name, description, color, userId } = req.body;
        const { id } = req.params;

        if (name.trim() !== '' && description.trim() !== '' && color.trim() !== '' && userId !== null) {
            const deck = await Deck.update({name, description, color, userId}, {
                where: {id}
            });
            res.json(deck);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will find a deck in the database with a primary key based on the id that is in the url.
 */
router.get('/:id', async (req, res, next) => {
    try {
        const deck = await Deck.findByPk(req.params.id, {
            include: [Card]
        })
        res.json(deck)
    } catch (err) {
        next(err);
    }
});

/*
 This will delete the deck from the database based on the ID that was passed in.
 */
router.get('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params
        await Deck.destroy({
            where: { id }
        })

        res.json({'success': true})
    } catch (err) {
        next(err);
    }
});

module.exports = router
