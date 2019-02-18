
var rp = require('request-promise');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'ChatAPI';

const opts = { 
    useNewUrlParser: true,
  };
// Create a new MongoClient
const client = new MongoClient(url,opts);


function getuser (req, res) {
    // Use connect method to connect to the Server
    client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);


    const findDocuments = function(db, callback) {
        // Get the documents collection
        const collection = db.collection('Fb_chat');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
          assert.equal(err, null);
          console.log("Found the following records");
          console.log(docs)
          callback(docs);
        });
      }
      const insertDocuments = function(db, callback) {
        // Get the documents collection
        const collection = db.collection('Fb_chat');
        // Insert some documents
        collection.insertMany([
          {_FBID : req.params.fbid}
        ], function(err, result) {
          assert.equal(err, null);
          assert.equal(3, result.result.n);
          assert.equal(3, result.ops.length);
          console.log("Inserted 3 documents into the collection");
          callback(result);
        });
      }

        findDocuments(db, function() {
          client.close();
      });

    client.close();
  });
}

function load (req, res) {
    
    var options = {
        uri: 'http://www.mocky.io/v2/5c5957dc3200001d20ba37d9',

        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    
    rp(options)
        .then(function (repos) {
            return res.send(repos)
        })
        .catch(function (err) {
            // API call failed...
        });
        
  }
  function filterAll(req, res) {
    var options = {
      uri: 'http://www.mocky.io/v2/5c5957dc3200001d20ba37d9',

      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
  };
  
  rp(options)
      .then(function (repos) {
          let data = {data:_.filter(repos.data, { '_id':parseInt(req.params.id),'name':req.params.name,"age":req.params.age})};
          return res.send(data);
          
          
          // return res.send(req.params.id)
      })
      .catch(function (err) {
          // API call failed...
      });
  }

  module.exports = {
    load,getuser,filterAll
  }
  