const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URL || 'mongodb://localhost/users';
const mockData = require('./mock_users.json');
const User = require('../model/user_model');

// Clean populating of mongodb database
// Run `node populate.js` to populate your database with 1000 mock users
MongoClient.connect(url, function(err, db) {
    console.log(url);
    if (err) {
        console.log(err);
    } else {
        let dbo = db.db("taskf");
        console.log("----------------- Start -----------------");
        dbo.collection("users")
            .insertMany(mockData)
            .then((result) => {
                console.log("Populating user collection completed");
                db.close();
            });
        console.log("----------------- Done-----------------");
    }
});