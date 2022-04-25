const httpStatus = require('http-status');
const { Character } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} characterBody
 * @returns {Promise<User>}
 */
const createCharacter = async (characterBody) => {
  return Character.create(characterBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCharacters = async (filter, options) => {
  const characters = await Character.paginate(filter, options);
  return characters;
};

module.exports = { createCharacter, queryCharacters };
