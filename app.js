//jshint esversion:6

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'fruitsDB';
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to the server");
    const db = client.db(dbName);

    insertDocuments(db, function() {
        findDocuments(db, function() {
            client.close();
        });

    });

});

const insertDocuments = function(db, callback) {
    const collection = db.collection('fruits');
    collection.insertMany([

        {
            name: "apple",
            score: 8,
            review: "So tasty!"

        },
        {
            name: "Orange",
            score: 1,
            review: "So sour and rotten"
        },
        {
            name: "Mango",
            score: 10,
            review: "Really yummy"
        }

    ], function(err, result) {
        assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        console.log("Sucessfully inserted data");
        callback(result);
    });
};
const findDocuments = function(db, callback) {
    const collection = db.collection('fruits');
    collection.find({}).toArray(function(err, fruits) {
        assert.equal(err, null);
        console.log("Successfully found the data");
        console.log(fruits);
        callback(fruits);
    });
}