const express = require('express');
const router = express.Router();
const { createClient, getClients, deleteClient } = require('../controllers/clientsController');

router.post('/', createClient);
router.get('/', getClients);
router.delete('/:id', deleteClient);

module.exports = router;
