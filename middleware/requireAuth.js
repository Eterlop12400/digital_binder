const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = (req, res, next) => {
    let authorization = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' });
    }

    authorization = JSON.stringify(authorization);
    authorization = JSON.parse(authorization);
    let token = authorization.bearer
    // args(token,secret,callback)
    jwt.verify(token, process.env.SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.' });
        }

        const id  = payload.id;
        console.log('trying to verify', id);
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).send({ error: 'Account deactivated.' });
        }

        req.user = user;
        next();
    });

    function errorHandler (err, req, res, next) {
        if (res.headersSent) {
            return next(err)
        }
        res.status(500)
        res.render('error', { error: err })
    }
};
