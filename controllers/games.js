const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))

// Require Model
let { Game, Set, Card } = require('../models')

/*
 This will return all games in the database.
 */
router.get('/', async (req, res, next) => {
    try {
        const games = await Game.findAll();

        if(games !== null) {
            res.json(games);
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will take the gameImage and name from the req.body and will then create a game using that information.
 */
router.post('/', async (req, res, next) => {
    try {
        const { gameImage, name } = req.body;

        if (gameImage.trim() !== '' && name.trim() !== '') {
            const game = await Game.create({ gameImage, name });
            res.json(game);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will find a game in the database with a primary key based on the id that is in the url.
 */
router.get('/:id', async (req, res, next) => {
    try {
        const set = await Game.findByPk(req.params.id, {
            include: [
                {
                    model: Set,
                    include: [Card]
                },
            ]
        });
        res.json(set);
    } catch (err) {
        next(err);
    }
});

/*
 This will take the gameImage and name from the req.body and will then update the game using that information where
 the ID being passed in the URL matches the user in the database.
 */
router.post('/:id', async (req, res, next) => {
    try {
        const { gameImage, name } = req.body
        const { id } = req.params

        if (gameImage.trim() !== '' && name.trim() !== '') {
            const game = await Game.update({ gameImage, name },{
                where: { id }
            });
            res.json(game);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will delete the game from the database based on the ID that was passed in.
 */
router.get('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Game.destroy({
            where: { id }
        });
        res.json({'success': true});
    } catch (err) {
        next(err);
    }

});

module.exports = router;