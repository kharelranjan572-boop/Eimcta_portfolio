const mongoose = require('mongoose');

const Advertisement = require('../model/usermodel');
const axios = require('axios');
require('dotenv').config();

exports.createAdvertisement = async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        const advertisement = await Advertisement.create(data);
        res.status(201).json({ success: true, data: advertisement });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getAdvertisement = async (req, res) => {
    try {
        const ads = await Advertisement.find();
        res.status(200).json({ success: true, data: ads });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};




const fs = require('fs');
const path = require('path');

exports.updateAdvertisement = async (req, res) => {
    try {
        const { id } = req.params; // Or req.body._id depending on your route
        const { image, ...otherData } = req.body;

        let updatedData = { ...otherData };


        const ad = await Advertisement.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!ad) {
            return res.status(404).json({ message: "Advertisement not found" });
        }

        res.status(200).json({ success: true, data: ad });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};






const longLivedToken = async (req, res, next) => {
    try {
        const response = await axios.get(process.env.FB_Graph_API, {
            params: {
                grant_type: 'fb_exchange_token',
                client_id: process.env.FB_app_id,
                client_secret: process.env.FB_app_secret,
                fb_exchange_token: process.env.Fb_short_token
            }
        });
        console.log('Long-lived token fetched successfully', response.data.access_token);
        req.longLivedToken = response.data.access_token;
        next();
    } catch (error) {
        console.error('Error fetching long-lived token:', error.message);
        throw error;
    }
}
module.exports.longLivedToken = longLivedToken;

const getPageAccessToken = async (req, res, next) => {
    console.log("Inside getPageAccessToken", req.longLivedToken);
    try {
        const token = await axios.get(`https://graph.facebook.com/v24.0/me/accounts`, {
            params: {
                access_token: req.longLivedToken
            }
        });
        req.token = token.data;
        // console.log('Page access token fetched successfully', req.token,token.data);
        next();
    } catch (error) {
        console.error('Error fetching page access token:', error.message);
        res.status(400).json({ success: false, error: error.message });
    }
}
module.exports.getPageAccessToken = getPageAccessToken;



const getPageData = async (req, res) => {
    console.log("Inside getPageData---------------", req.token);
};
module.exports.getPageData = getPageData;


const FACEBOOK_APP_ID = '2302421303615349';
const FACEBOOK_APP_SECRET = 'fb123ee72df2210036e3201b96fd3864';
const REDIRECT_URI = 'http://localhost:5000/callback';
const SCOPES = 'pages_show_list,pages_read_engagement';

const getTest = async (req, res, next) => {
    try {
        const fbLoginUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=123&scope=${SCOPES}`;
        console.log(fbLoginUrl);
        res.send(`
            <html>
                <body>
                    <h2>Login with Facebook</h2>
                    <a href="${fbLoginUrl}">
                        <button>Login with Facebook</button>
                    </a>
                </body>
            </html>
        `);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
}
module.exports.getTest = getTest;

const callback = async (req, res, next) => {
    // console.log("runnung callback function ********")
    const code = req.query.code;
    // console.log(code)
    if (!code) return res.send('No code received');

    try {
        const tokenResponse = await axios.get(`https://graph.facebook.com/v22.0/oauth/access_token`, {
            params: {
                client_id: FACEBOOK_APP_ID,
                client_secret: FACEBOOK_APP_SECRET,
                redirect_uri: REDIRECT_URI,
                code: code
            }
        });
        const accessToken = tokenResponse.data.access_token;
        console.log("SUCCESS! User Access Token:", accessToken);

        // Now you can use this token to get user info or pages
        res.send(`
            <h1>Successfully Authenticated!</h1>
            <p>Your Access Token is logged in the console.</p>
            <a href="/get-pages?token=${accessToken}">View my Pages</a>
        `);

    } catch (error) {
        console.error(error)
        throw (new error)
    }
}

module.exports.callback = callback;