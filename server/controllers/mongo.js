const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const rp = require("request-promise");
const _ = require('lodash');
const request = require('request');
const  { MONGO_HOST } = require('../../constants/server')

// Connection URL
const url = MONGO_HOST;
const dbName = "ChatAPI";

const opts = {
  useNewUrlParser: true
};
// Create a new MongoClient
const client = new MongoClient(url, opts);

function insertChat(sender_psid, recipient, received_message, timestamp) {
  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    const db = client.db(dbName);

    let collectionSelect;
    let data;

    const insertDocuments = function(db, collectionSelect, data, callback) {
      // Get the documents collection
      const collection = db.collection(collectionSelect);
      // Insert some documents
      collection.insertOne(
        data,
        // {'sender_psid' : sender_psid,'recipient':recipient,'msg':received_message,'timestamp':timestamp}
        function(err, result) {
          assert.equal(null, err);
          assert.equal(1, result.insertedCount);
          // console.log("Inserted 1 documents into the collection");
          callback();
        }
      );
    };
    const findRoom = function(db, sender_psid, recipient, callback) {
      // Get the documents collection
      const collection = db.collection("Room");
      // Find some documents
      collection
        .find({
          participants: {
            $all: [sender_psid, recipient]
          }
        })
        .toArray(function(err, docs) {
          assert.equal(err, null);
          callback(docs);
        });
    };

    findRoom(db, sender_psid, recipient, function(docs) {
      let roomid;

      if (docs.length == 0) {
        collectionSelect = "Room";
        let Newroomid = recipient + sender_psid;
        data = { roomid: Newroomid, participants: [sender_psid, recipient] };
        //Create Chat Room
        insertDocuments(db, collectionSelect, data, function() {});
        roomid = Newroomid; //ถ้าสังเกตุจะเห็นว่า roomid นี้จะถูกประกาศไว้ก่อนเก็นใน db
      } else {
        roomid = docs[0].roomid;
      }
      collectionSelect = "Fb_chat";
      data = {
        roomid: roomid,
        sender_psid: sender_psid,
        msg: received_message,
        timestamp: timestamp
      };
      //inser Chat
      insertDocuments(db, collectionSelect, data, function() {
        client.close();
      });
      // client.close();
    });
  });
}
function insertUserProfile(sender_psid, callback) {
  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    // console.log("Connected successfully to server");

    const db = client.db(dbName);

    const findProfile = function(db, callback) {
      // Get the documents collection
      const collection = db.collection("User");
      // Find some documents
      collection.find({ id: sender_psid }).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
      });
    };
    const insertProfile = function(db, fb_profile) {
      // Get the documents collection
      const collection = db.collection("User");

      //Check Role
      if (fb_profile.name == null) {
        fb_profile.role = "user";
      } else {
        fb_profile.role = "page";
      }
      // Insert some documents
      collection.insertOne(fb_profile, function(err, result) {
        assert.equal(null, err);
        assert.equal(1, result.insertedCount);
      });
    };
    findProfile(db, function(docs) {
      if (docs.length == 0) {
        apiCall(
          "https://graph.facebook.com/" +
            sender_psid +
            "?access_token=EAAf21W9ZCZCQsBAAyHB0vNOKqwBG0QxOSWBgSNeK09UKa2rVQzDG9J8GrgjzwHp0VdYNNtC2ZCG1QhZA5PH2BvY3Shpb2vvuldcuGjCDHQp2bgPWHMqZCZBeNfUdhpfEPI7TDP9vzcpW0y9NR00esLfwOGZAXJK9c5ISx8fZBBsYZCT3Kg7eOTcJamnfisfOFFNwZD",
          function(fb_profile) {
            insertProfile(db, fb_profile);
          }
        );
      }
      client.close();
    });
  });
  callback();
}
function apiCall(Uri, callback) {
  var options = {
    uri: Uri,

    headers: {
      "User-Agent": "Request-Promise"
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function(repos) {
      callback(repos);
    })
    .catch(function(err) {
      console.log(err);
    });
}
function userChat(req, res) {
  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    // console.log("Connected successfully to server");

    const db = client.db(dbName);

    const findUserChat = function(db, callback) {
      // Get the documents collection
      const collection = db.collection("Room");
      // Find some documents
      collection
        .find({
          participants: {
            $all: [req.params.pageid]
          }
        })
        .toArray(function(err, docs) {
          assert.equal(err, null);
          callback(docs);
        });
    };
    const findProfile = function(db,sender_psid, callback) {
      // Get the documents collection
      const collection = db.collection("User");
      // Find some documents
      collection.find({ id: sender_psid }).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
      });
    };
    const findLastChat = function(db,roomid, callback) {
      // Get the documents collection
      const collection = db.collection("Fb_chat");
      // Find some documents
      collection
      .find({'roomid':roomid}).sort({$natural:-1}).limit(1)
        .toArray(function(err, docs) {
          assert.equal(err, null);
          callback(docs);
        });
    };
    
    findUserChat(db, function(docs) {
      let userdata =[];
      var lastmsg
      docs.forEach((element,i) => {
        console.log(element.roomid);
        findLastChat(db,element.roomid, function(docss) {
          lastmsg = docss[0].msg;    
        })
        let user = _.remove(element.participants, function(n) {
          return n != req.params.pageid;
        });
        
        findProfile(db,user[0], function(data) {
          data[0].roomid = element.roomid;
          data[0].lastmsg = lastmsg;
          userdata.push(data[0]);
          if(i == docs.length-1){
            return res.json(userdata)
          }
        });
      })
    });
  });
}
function chatData(req, res) {
  let roomid = req.params.roomid
  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    const db = client.db(dbName);

    const findChatData = function(db,roomid, callback) {
      // Get the documents collection
      const collection = db.collection("Fb_chat");
      // Find some documents
      collection
        .find({'roomid':roomid})
        .toArray(function(err, docs) {
          assert.equal(err, null);
          callback(docs);
        });
    };

    findChatData(db,roomid, function(docs) {
      let message = docs.slice(docs.length-15, docs.length);
      res.json(message)
      client.close();
    });
  });
  // res.json()  
}
module.exports = {
  insertChat,
  insertUserProfile,
  userChat,
  chatData
};
