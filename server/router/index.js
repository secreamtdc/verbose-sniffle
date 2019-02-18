const express = require('express')

var rp = require('request-promise');

const userCtrl = require('../controllers/index')
const mongo = require('../controllers/mongo')
const request = require('request');
const router = express.Router()

  router.get('/api/getdata', (userCtrl.load));
  router.get('/api/user/:fbid', (userCtrl.getuser));

  router.get('/api/userchat/:pageid', (mongo.userChat));
  router.get('/api/chatdata/:roomid', (mongo.chatData));
  router.get('/api/getdata/:id/:name/:age',(userCtrl.filterAll));
  
  router.get('/ping', (req, res) => {
    res.send('pong')
  })
  
  router.get('/a', (req, res) => {
      console.log(req.query);
      
      return res.render(req, res, '/index', req.query)
  })


module.exports = router
