const express = require('express');
const characterController = require('../../controllers/character.controller');

const router = express.Router();

router.route('/').post(characterController.createCharacter).get(characterController.getCharacters);

module.exports = router;
