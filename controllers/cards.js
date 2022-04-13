const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))

// Require Model
const {Card} = require("../models");


/*
 This will return all cards in the database.
 */
router.get('/', async (req, res, next) => {
    try {
        const cards = await Card.findAll();

        if(cards !== null) {
            res.json(cards);
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will take the cardImage, name, rarity, type, faction, characteristics, effect, damage, power, support, setId from the req.body and will then create a new card in the database using
 that information.
 */
router.post('/', async (req, res, next) => {
    try {
        const { cardImage, name, rarity, rarityShorthand, type, faction, characteristics, effect, damage, power, support,
            setId, collectionId, deckId } = req.body;

        if(cardImage.trim() !== '' && name.trim() !== '' && rarity.trim() !== '' && rarityShorthand.trim() !== ''
            && type.trim() !== '' && faction.trim() !== '' && characteristics.trim() !== '' && effect.trim() !== ''
            && damage !== null && power !== null && support !== null) {
            const card = await Card.create({ cardImage, name, rarity, rarityShorthand, type, faction, characteristics,
                effect, damage, power, support, setId, collectionId, deckId });

            res.json(card);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
})

/*
 This will take the cardImage, name, rarity, type, faction, characteristics, effect, damage, power, support, setId, collectionId, and deckId from the req.body and will then update the user using that information where
 the ID being passed in the URL matches the user in the database.
 */
router.post('/:id', async (req, res, next) => {
    try {
        const { cardImage, name, rarity, rarityShorthand, type, faction, characteristics, effect, damage, power, support,
            setId, collectionId, deckId } = req.body;
        const { id } = req.params;

        if(cardImage.trim() !== '' && name.trim() !== '' && rarity.trim() !== '' && rarityShorthand.trim() !== ''
            && type.trim() !== '' && faction.trim() !== '' && characteristics.trim() !== '' && effect.trim() !== ''
            && damage !== null && power !== null && support !== null) {
            const card = await Card.update({ cardImage, name, rarity, rarityShorthand, type, faction, characteristics,
                effect, damage, power, support, setId, collectionId, deckId },{
                where: { id }
            });
            res.json(card);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will find a card in the database with a primary key based on the id that is in the url.
 */
router.get('/:id', async (req, res, next) => {
    try {
        const card = await Card.findByPk(req.params.id, {});
        res.json(card);
    } catch (err) {
        next(err);
    }
});

/*
 This will delete the card from the database based on the ID that was passed in.
 */
router.get('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Card.destroy({
            where: { id }
        });

        res.json({'success': true});
    } catch (err) {
        next(err);
    }
});


module.exports = router