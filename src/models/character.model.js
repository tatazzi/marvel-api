const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

function getDecimal(value) {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toString());
  }
  return value;
}

const characterSchema = mongoose.Schema(
  {
    appearsOn: {
      type: [
        {
          posterUrl: String,
          type: {
            type: String,
            enum: ['movie', 'tv-show', 'comics'],
          },
        },
      ],
    },
    characteristics: {
      age: {
        required: true,
        type: Number,
        default: 0,
      },
      earthNumber: {
        required: true,
        type: Number,
        default: 0,
      },
      height: {
        required: true,
        type: mongoose.Decimal128,
        get: getDecimal,
        default: 0,
      },
      weight: {
        required: true,
        type: mongoose.Decimal128,
        get: getDecimal,
        default: 0,
      },
    },
    habilities: {
      agility: {
        required: true,
        type: Number,
        default: 0,
      },
      intelligence: {
        required: true,
        type: Number,
        default: 0,
      },
      resistance: {
        required: true,
        type: Number,
        default: 0,
      },
      speed: {
        required: true,
        type: Number,
        default: 0,
      },
      strength: {
        required: true,
        type: Number,
        default: 0,
      },
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      required: true,
    },
    pseudonym: {
      unique: true,
      type: String,
      required: true,
    },
    realName: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      trim: true,
      type: String,
      required: true,
      enum: ['hero', 'villain', 'anti-hero', 'alien', 'human'],
    },
  },
  { toJSON: { getters: true } }
);

// add plugin that converts mongoose to json
characterSchema.plugin(toJSON);
characterSchema.plugin(paginate);

/**
 * @typedef Character
 */
const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
