const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
const Tournament = require('../models/Tournament')



//Route 1: Get tournaments for the logged in user using GET "/api/tournaments" , login required
router.get('/', fetchuser, async (req, res) => {
    try {
        const tournaments = await Tournament.find({ user: req.user.id })
        res.json(tournaments)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error.");
    }
})

//Route 8: Get all tournaments available using GET "/api/tournaments/all"
router.get('/all', async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate('user', ['name', 'email']).populate('creator', ['name', 'email']);
        res.json(tournaments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});


//Route 2: Get tournament by id using GET "/api/tournaments/:id" , login required
router.get('/:id', fetchuser, async (req, res) => {
    try {
        // Find the tournament by id and return it
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            return res.status(404).send("Tournament not found");
        }
        // Allow access only if user owns this tournament
        if (tournament.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        res.json(tournament);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route 3: Add a new tournament using POST "/api/tournaments", login required
router.post('/', fetchuser, [
    body('title', 'Enter a Valid Title').isLength({ min: 3 }),
    body('game', 'Enter a valid game name').isLength({ min: 2 }),
    body('description', 'Enter a valid description of at least 5 characters').isLength({ min: 5 }),
    body('date', 'Enter a valid date').isDate(),
    body('time', 'Enter a valid time').isLength({ min: 1 }),

], async (req, res) => {
    try {
        const { title, game, description, date, time } = req.body;
        // If there are errors, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const tournament = new Tournament({
            title,
            game,
            description,
            date,
            time,
            user: req.user.id,
            creator: req.user.id // Add the creator field
        })
        const savedTournament = await tournament.save();
        res.json({ savedTournament })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error.");
    }
})


//Route 4: Update an existing tournament using PUT "/api/tournaments/:id" , login required
router.put('/:id', fetchuser, async (req, res) => {
    const { title, game, description, date, time } = req.body;
    try {


        // Check if req.user is defined
        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }
        // Find the tournament to be updated
        let tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            return res.status(404).send("Tournament not found");
        }
        // Check if the user updating the tournament is the creator
        if (tournament.creator.toString() !== req.user.id) {
            return res.status(401).send("Not authorized to update this tournament");
        }

        // Update the tournament details
        tournament.title = title || tournament.title;
        tournament.game = game || tournament.game;
        tournament.description = description || tournament.description;
        tournament.date = date || tournament.date;
        tournament.time = time || tournament.time;
        tournament = await tournament.save();
        res.json({ tournament });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


//Route 5: Delete an existing tournament using DELETE "/api/tournaments/:id" , login required
router.delete('/:id', fetchuser, async (req, res) => {
    try {
        // Find the tournament to be deleted and delete it
        let tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            return res.status(404).send("Tournament not found");
        }
        // Allow deletion only if user owns this tournament
        if (tournament.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        tournament = await Tournament.findByIdAndDelete(req.params.id);
        res.json({ "success": "Tournament has been deleted", "tournament": tournament });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//Route 6: Join a tournament using POST "/api/tournaments/:id/join" , login required
router.post('/:id/join', fetchuser, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid tournament id');
        }

        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            return res.status(404).send('Tournament not found');
        }

        // Check if user is already a participant
        if (tournament.participants.includes(req.user.id)) {
            return res.status(400).send('You have already joined this tournament');
        }

        // Add user ID to participants array
        tournament.participants.push(req.user.id);
        await tournament.save();

        res.json({ tournament });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
});

// Route 7: Delete a participant from tournament using DELETE /tournaments/:id/participants/:participantId
// Delete a participant from a tournament
router.delete('/:id/participants/:participantId', async (req, res) => {
    const { id, participantId } = req.params;

    try {
        // Find the tournament by ID
        const tournament = await Tournament.findById(id);

        // Check if the tournament exists
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        // Check if the logged in user is the creator of the tournament
        if (tournament.creator.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Find the participant by ID
        const participant = tournament.participants.find(p => p._id.toString() === participantId);

        // Check if the participant exists
        if (!participant) {
            return res.status(404).json({ message: 'Participant not found' });
        }

        // Remove the participant from the tournament
        tournament.participants = tournament.participants.filter(p => p._id.toString() !== participantId);

        // Save the updated tournament
        await tournament.save();

        res.json(tournament);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});



module.exports = router;