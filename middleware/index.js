const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
// middleware for sessions
const expressSession = require('express-session');
// store for saving sessions
const FileStore = require('session-file-store')(expressSession);

module.exports = app => {
    /* Always used middleware */
    app.set('trust proxy', 1); // trust first proxy
    app.use(cors());
    app.use(json()); // req.body!
    app.use(urlencoded({ extended: true }));
    app.use(morgan('dev'));

    app.use(
        expressSession({
            // another secret used for encoding session data
            secret: process.env.SECRET,
            // should the session save again if nothing has changed?
            resave: false,
            // should sessions be created if they have no data?
            saveUninitialized: false,
            // where to store the session data
            store: new FileStore(),
        })
    );
};