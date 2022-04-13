const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))

// Require Model
let { Set, Card } = require('../models')

/*
 This will return all sets in the database.
 */
router.get('/', async (req, res, next) => {
    try {
        const sets = await Set.findAll();

        if(sets !== null) {
            res.json(sets);
        }
    } catch (err) {
        next(err);
    }

});

/*
 This will take the setImage, name, and gameId from the req.body and will then create a set using that information.
 */
router.post('/', async (req, res, next) => {
    try {
        const { setImage, name, gameId } = req.body;

        if(setImage.trim() !== '' && name.trim() !== '' && gameId !== null) {
            const set = await Set.create({ setImage, name, gameId });
            res.json(set);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will find a set in the database with a primary key based on the id that is in the url.
 */
router.get('/:id', async (req, res, next) => {
    try {
        const set = await Set.findByPk(req.params.id, {
            include: [Card]
        });
        res.json(set);
    } catch (err) {
        next(err);
    }
});

/*
 This will take the setImage, name, and gameId from the req.body and will then update the set using that information where
 the ID being passed in the URL matches the user in the database.
 */
router.post('/:id', async (req, res, next) => {
    try {
        const { setImage, name, gameId } = req.body;
        const { id } = req.params;

        if(setImage.trim() !== '' && name.trim() !== '' && gameId !== null) {
            const set = await Set.update({ setImage, name, gameId },{
                where: { id }
            });
            res.json(set);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will delete the set from the database based on the ID that was passed in.
 */
router.get('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Set.destroy({
            where: { id }
        });

        res.json({'success': true});
    } catch (err) {
        next(err);
    }
});

module.exports = router