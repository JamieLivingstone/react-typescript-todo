import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as passport from 'passport';
const router = require('./routes/index');

// Create express instance
const app = express();

// Allow CORS (Otherwise the client side requests will fail)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Raw post requests to usable properties on req.body
app.use(bodyParser.json({ limit: '4mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Include passport login strategy
require('./handlers/passport');

// Use passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Setup routes
app.use('/', router);

// Export app
export default app;
