///<reference path="../node_modules/@types/mongoose/index.d.ts"/>
import * as mongoose from 'mongoose';

// Require environment variables
require('dotenv').config({ path: '../variables.env' });

// Use global promise due to mongoose deprecating their built in one
(<any> mongoose).Promise = Promise;

// Connect to database
const databaseUrl: string = process.env.DATABASE;

if (!databaseUrl) {
   throw Error('No database connection found in environment variables');
}

mongoose.connect(databaseUrl, { useMongoClient: true });

mongoose.connection.on('error', (err: { message: string }) => {
   console.error(`Error connecting to database: ${err.message}`);
});

// Include database models
require('./models/User');
require('./models/Todo');

// Include app (routes, models and middleware)
import app from './app';

// Set the port
const port: number = parseInt(process.env.PORT) || 9024;
app.set('port', port);

// Start the server
app.listen(app.get('port'), () => console.log(`Server started on port ${port}`));
