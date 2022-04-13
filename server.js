const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const middlewares = require('./middleware');

// attaches all middlewares to the app
middlewares(app);

// Require Controllers
const usersCtrl = require('./controllers/users')
const collectionsCtrl = require('./controllers/collections')
const decksCtrl = require('./controllers/decks')
const gamesCtrl = require('./controllers/games')
const setsCtrl = require('./controllers/sets')
const cardsCtrl = require('./controllers/cards')
const authRoutes = require('./controllers/authRoutes');
const requireAuth = require('./middleware/requireAuth');
const defaultErrorHandler = require("./middleware/defaultErrorHandler");

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,
    "allowCrossDomain": true
}));

// Telling our app to use these
app.use('/user', requireAuth, usersCtrl)
app.use('/auth', authRoutes)
app.use('/collection', requireAuth, collectionsCtrl)
app.use('/deck', requireAuth, decksCtrl)
app.use('/game', requireAuth, gamesCtrl)
app.use('/set', requireAuth, setsCtrl)
app.use('/card', requireAuth, cardsCtrl) 

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'reactjs/build')));
    
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'reactjs/build', 'index.html'));
    });
}

app.use(defaultErrorHandler);


app.listen(port, () => console.log(`Listening on port ${port}`));
