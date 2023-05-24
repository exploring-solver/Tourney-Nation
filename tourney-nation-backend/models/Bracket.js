const mongoose = require('mongoose');

const BracketSchema = new mongoose.Schema({
  participants: {
    type: [String],
    required: true,
  },
  matches: {
    type: [
      {
        round: Number,
        matchIndex: Number,
        player1: {
          name: String,
          score: {
            type: Number,
            default: 0,
          },
        },
        player2: {
          name: String,
          score: {
            type: Number,
            default: 0,
          },
        },
        winner: {
          type: String,
          enum: ['player1', 'player2', null],
          default: null,
        },
      },
    ],
    default: [],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Generate a new bracket based on the participant names
BracketSchema.methods.generate = async function () {
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  const numParticipants = this.participants.length;
  const numRounds = Math.ceil(Math.log2(numParticipants));
  const numMatches = Math.pow(2, numRounds - 1);

  const shuffledParticipants = shuffle(this.participants);

  const matches = [];

  for (let round = 1; round <= numRounds; round++) {
    const numMatchesThisRound = numMatches / Math.pow(2, round - 1);

    for (let matchIndex = 0; matchIndex < numMatchesThisRound; matchIndex++) {
      const player1Index = (matchIndex * 2) % numParticipants;
      const player2Index = ((matchIndex * 2) + 1) % numParticipants;

      const match = {
        round,
        matchIndex,
        player1: {
          name: shuffledParticipants[player1Index],
        },
        player2: {
          name: shuffledParticipants[player2Index],
        },
      };

      matches.push(match);
    }
  }

  this.matches = matches;
};
const Bracket = mongoose.model('Bracket', BracketSchema);
module.exports = Bracket;