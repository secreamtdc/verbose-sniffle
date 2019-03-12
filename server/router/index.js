const express = require('express')

var rp = require('request-promise');

const userCtrl = require('../controllers/index')
const mongo = require('../controllers/mongo')
const accounts = require('../controllers/accounts')
const request = require('request');
const router = express.Router()

  router.get('/api/getdata', (userCtrl.load));
  router.get('/api/user/:fbid', (userCtrl.getuser));
  router.get('/api/userchat/:pageid', (mongo.userChat));
  router.get('/api/chatdata/:roomid', (mongo.chatData));
  router.get('/api/getdata/:id/:name/:age',(userCtrl.filterAll));
  
  router.get('/api/admin/accounts/:account_id/users',(accounts.getUser));
  router.get('/api/admin/accounts/:account_id/roles',(accounts.getRole));
  router.get('/api/admin/accounts/:account_id/groups',(accounts.getGroup));
  router.get('/api/admin/accounts/changerole/:user_id/:role_id',(accounts.changeRole));
  router.get('/api/admin/accounts/changegroup/:user_id/:group_id',(accounts.changeGroup));

  router.get('/api/admin/accounts/:account_id/search/:search',(accounts.getUserSearch));
  
  router.get('/ping', (req, res) => {
    res.send('pong');
  })
  


module.exports = router
