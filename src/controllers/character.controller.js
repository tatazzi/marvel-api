const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { characterService } = require('../services');

const createCharacter = catchAsync(async (req, res) => {
  const character = await characterService.createCharacter(req.body);
  res.status(httpStatus.CREATED).send(character);
});

const getCharacters = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['realName', 'type']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await characterService.queryCharacters(filter, options);
  res.send(result);
});

const getCharacter = catchAsync(async (req, res) => {
  const character = await characterService.getCharacterById(req.params.characterId);
  if (!character) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Character not found');
  }
  res.send(character);
});

module.exports = {
  createCharacter,
  getCharacters,
  getCharacter,
};
