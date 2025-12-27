const axios = require('axios');
require('dotenv').config();

const CLIENT_KEY = process.env.Tiktok_Client_key;
const CLIENT_SECRET = process.env.Tiktok_Client_SECRET;
const REDIRECT_URI = process.env.Tiktok_REDIRECT_URI;
const scopes = process.env.Tiktok_SCOPES

// Generate TikTok OAuth URL
exports.getAuthURL = (req, res) => {
    const state = Math.random().toString(36).substring(2, 15);
    const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${CLIENT_KEY}&scope=${scopes}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${state}`;
    res.redirect(url);
    console.log(url)
};

// Exchange code for access token
exports.exchangeToken = async (req, res) => {
    const { code } = req.query;
    console.log(code)
    if (!code) return res.send('No code received');

    try {
        const response = await axios.post('https://open-api.tiktok.com/oauth/access_token/', {
            client_key: CLIENT_KEY,
            client_secret: CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI
        });

        res.json(response.data); // includes access_token & refresh_token
    } catch (error) {
        res.send(error.response ? error.response.data : error.message);
    }
};

// Fetch TikTok user info
exports.getUserInfo = async (req, res) => {
    const { token } = req.params;
    try {
        const response = await axios.get(`https://open-api.tiktok.com/user/info/?access_token=${token}`);
        res.json(response.data);
    } catch (error) {
        res.send(error.response ? error.response.data : error.message);
    }
};
