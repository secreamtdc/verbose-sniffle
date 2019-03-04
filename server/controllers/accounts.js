const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var rp = require("request-promise");
var _ = require('lodash');
var ObjectId = require('mongodb').ObjectID;
const  { MONGO_HOST} = require('../../constants/server')


// Connection URL
const url = MONGO_HOST;
const dbName = "Central";

const opts = {
  useNewUrlParser: true
};
// Create a new MongoClient
const client = new MongoClient(url, opts);

function getUser(req, res) {
  // Use connect method to connect to the Server
  client.connect(function (err) {
    assert.equal(null, err);
    // console.log("Connected successfully to server");

    const db = client.db(dbName);

    const findUser =  function (db, callback) {
      // Get the documents collection
      const collection = db.collection("users");
      // Find some documents

      collection.aggregate(
        [{ $match: { account_id: Number(req.params.account_id) } },
        { $lookup: { from: "group", localField: "group_id", foreignField: "_id", as: "group_docs" } },
        { $lookup: { from: "role", localField: "role_id", foreignField: "_id", as: "role_docs" } }]
      ).toArray(async function (err, docs) {
        await assert.equal(err, null);
        callback(docs);
      });
    };

    findUser(db, function (data) {
      client.close();
      res.json(data)
      
    });
  });
}
 function getRole(req, res) {
  // Use connect method to connect to the Server
  client.connect(function (err) {
    assert.equal(null, err);
    // console.log("Connected successfully to server");

    const db = client.db(dbName);

    const findRole =  function (db, callback) {
      // Get the documents collection
      const collection = db.collection("role");
      // Find some documents
     collection.find({ "account_id": String(req.params.account_id) }).toArray( async function (err, docs) {
      await assert.equal(err, null);
        callback(docs);
      });
    };
    findRole(db, function (data) {
      client.close();
      res.json(data)
    });
  });
}
function getGroup(req, res) {
  // Use connect method to connect to the Server
  client.connect(function (err) {
    assert.equal(null, err);
    // console.log("Connected successfully to server");

    const db = client.db(dbName);

    const findGroup =  function (db, callback) {
      // Get the documents collection
      const collection = db.collection("group");
      // Find some documents
      collection.find({ "account_id": Number(req.params.account_id) }).toArray(async function (err, docs) {
        await assert.equal(err, null);
        callback(docs);
      });
    };
    findGroup(db, function (data) {
      client.close();
      res.json(data)
    });
  });
}
function changeRole(req, res) {
        // Use connect method to connect to the Server
        client.connect(function (err, client) {
          assert.equal(null, err);
          const db = client.db(dbName);
          const collection = db.collection("users");

          var myquery = { '_id': new ObjectId(req.params.user_id) };
          var document = { $set: { 'role_id': new ObjectId(req.params.role_id)}, $currentDate: { lastModified: true } };
  
          //Query Chat
          collection.updateOne(myquery,document, function (err, records) {
            client.close();
            res.json(records)
          });
        });
}
function changeGroup(req, res) {
  // Use connect method to connect to the Server
  client.connect(function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection("users");

    var myquery = { '_id': new ObjectId(req.params.user_id) };
    var document = { $set: { 'group_id': new ObjectId(req.params.group_id)}, $currentDate: { lastModified: true } };

    //Query Chat
    collection.updateOne(myquery,document, function (err, records) {
      client.close();
      res.json(records)
    });
  });
}





module.exports = {

  getUser,
  getRole,
  getGroup,
  changeRole,
  changeGroup

};
