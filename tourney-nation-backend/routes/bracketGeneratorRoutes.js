const express = require('express');
const router = express.Router();
const Bracket = require('../models/Bracket');
const fetchuser = require('../middleware/fetchuser');

// Route to generate a bracket
router.post('/generate', fetchuser, async (req, res) => {
  try {
    // Get the participant names from the request body
    const { participants } = req.body;

    // Check if participants array contains at least 2 elements
    if (!Array.isArray(participants) || participants.length < 2) {
      return res.status(400).json({ message: "At least 2 participants are required" });
    }

    // Generate a new bracket based on the participant names
    const bracket = new Bracket({
      participants,
      creator: req.user.id,
    });
    await bracket.generate();

    // Return the generated bracket
    res.json(bracket);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
