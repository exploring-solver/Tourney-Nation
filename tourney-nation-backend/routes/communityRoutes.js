const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Community = require('../models/Community');

// Route 1: Get all communities for the logged in user using GET "/api/communities" , login required
router.get('/', fetchuser, async (req, res) => {
  try {
    const communities = await Community.find({ user: req.user.id });
    res.json(communities);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error.');
  }
});

// Route 2: Get community by id using GET "/api/communities/:id" , login required
router.get('/:id', fetchuser, async (req, res) => {
  try {
    // Find the community by id and return it
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).send('Community not found');
    }
    // Allow access only if user owns this community
    if (community.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed');
    }
    res.json(community);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// Route 3: Add a new community using POST "/api/communities" , login required
router.post(
  '/',
  fetchuser,
  [
    body('communityName', 'Enter a Valid Community Name').isLength({ min: 3 }),
    body('communityType', 'Enter a valid community type').isLength({ min: 2 })
  ],
  async (req, res) => {
    try {
      const { communityName, communityType } = req.body;
      //if there are errors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const community = new Community({
        communityName,
        communityType,
        user: req.user.id
      });
      const savedCommunity = await community.save();
      res.json({ savedCommunity });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error.');
    }
  }
);

// Route 4: Update an existing community using PUT "/api/communities/:id" , login required
router.put('/:id', fetchuser, async (req, res) => {
  const { communityName, communityType } = req.body;
  try {
    //create a newCommunity object
    const newCommunity = {};
    if (communityName) {
      newCommunity.communityName = communityName;
    }
    if (communityType) {
      newCommunity.communityType = communityType;
    }
    //find the community to be updated and update it
    let community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).send('Community not found');
    }
    if (community.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed');
    }
    community = await Community.findByIdAndUpdate(
      req.params.id,
      { $set: newCommunity },
      { new: true }
    );
    res.json({ community });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal server error');
  }
});

//Route 5: Delete an existing community using DELETE "/api/communities/:id" , login required
router.delete('/:id', fetchuser, async (req, res) => {
    try {
        // Find the community to be deleted and delete it
        let community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(404).send("Community not found");
        }
        // Allow deletion only if user owns this community
        if (community.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        community = await Community.findByIdAndDelete(req.params.id);
        res.json({ "success": "Community has been deleted", "community": community });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
