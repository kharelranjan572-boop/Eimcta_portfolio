const express = require('express');
const router = express.Router();
const tiktokController = require('../controller/tiktokController');

// Step 1: Redirect to TikTok login
router.get('/auth', tiktokController.getAuthURL);

// Step 2: Callback to exchange code for access token
router.get('/callback', tiktokController.exchangeToken);

// Optional: fetch user info using access token
router.get('/user-info/:token', tiktokController.getUserInfo);

module.exports = router;
