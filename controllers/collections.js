const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))

// Require Model
const {Collection, Card} = require("../models");

/*
 This will return all collections in the database.
 */
router.get('/', async (req, res, next) => {
    try {
        const collections = await Collection.findAll();

        if(collections !== null) {
            res.json(collections);
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will take the name, description, color, and userId from the req.body and will then create a collection using that information.
 */
router.post('/', async (req, res, next) => {
    try {
        const { name, description, color, userId } = req.body;

        if (name.trim() !== '' && description.trim() !== '' && color.trim() !== '' && userId !== null) {
            const collection = await Collection.create({name, description, color, userId});
            res.json(collection);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will take the name, description, color, and userId from the req.body and will then update the collection using that information where
 the ID being passed in the URL matches the user in the database.
 */
router.post('/:id', async (req, res, next) => {
    try {
        const { name, description, color, userId } = req.body;
        const { id } = req.params;

        if (name.trim() !== '' && description.trim() !== '' && color.trim() !== '' && userId !== null) {
            const collection = await Collection.update({name, description, color, userId}, {
                where: {id}
            });

            res.json(collection);
        } else {
            return res.status(400).send({ error: 'Invalid Request!' });
        }
    } catch (err) {
        next(err);
    }
});

/*
 This will find a collection in the database with a primary key based on the id that is in the url.
 */
router.get('/:id', async (req, res, next) => {
    try {
        const collection = await Collection.findByPk(req.params.id, {
            include: [Card]
        });
        res.json(collection);
    } catch (err) {
        next(err);
    }
});

/*
 This will delete the collection from the database based on the ID that was passed in.
 */
router.get('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Collection.destroy({
            where: { id }
        });

        res.json({'success': true});
    } catch (err) {
        next(err);
    }
});

module.exports = router