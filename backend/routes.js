const express = require('express');
const router = express.Router();
const controller = require('./controller');
const knex = require('../knex');


// Dynamic Get
router.get('/api/d/:table/:value/:variable', async (req, res, next) => {
  try{
      await controller.get(req, res);
  } catch(error){
      return next(error);
  } 
});


// Dynamic Post
// /api/d/{table}/post
router.post('/api/d/:table/:value/:variable', async (req, res, next) => {
  try{
    await controller.post(req, res);
  } catch(error){
    return next(error);
  }
});

// Dynamic Put
// /api/d/{table}/{variable}/put
router.put('/api/d/:table/:variable/:value/:variable', async (req, res, next) => {
  try{
    await controller.put(req, res);
  } catch(error){
    return next(error);
  }
});

// Dynamic Delete
// /api/d/{table}/{variable}/delete
router.delete('/api/d/:table/:variable', async (req, res, next) => {
  try{
    await controller.delete(req, res);
  } catch(error){
    return next(error);
  }
});

// POPULATE TABLE (accounts, classes)
router.put('/populate/accounts/:amount', async (req, res, next) => {
  try{
    await controller.populateAccounts(req, res);
  } catch(error){
    return next(error);
  }
});

module.exports = router;