"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../node_modules/@types/mongoose/index.d.ts"/>
const mongoose = require("mongoose");
// Require environment variables
require('dotenv').config({ path: '../variables.env' });
// Use global promise due to mongoose deprecating their built in one
mongoose.Promise = Promise;
// Connect to database
const databaseUrl = process.env.DATABASE;
if (!databaseUrl) {
    throw Error('No database connection found in environment variables');
}
mongoose.connect(databaseUrl, { useMongoClient: true });
mongoose.connection.on('error', (err) => {
    console.error(`Error connecting to database: ${err.message}`);
});
// Include database models
require('./models/User');
// Include app (routes, models and middleware)
const app_1 = require("./app");
// Set the port
const port = parseInt(process.env.PORT) || 9024;
app_1.default.set('port', port);
// Start the server
app_1.default.listen(app_1.default.get('port'), () => console.log(`Server started on port ${port}`));
//# sourceMappingURL=index.js.map