require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json()); 

// When GHL knocks on this door, do the following:
app.post('/forward', async (req, res) => {
    try {
        // 1. Grab the secret URL from your hidden safe
        const secretUrl = process.env.SECRET_WEBHOOK_URL;

        // 2. Send the GHL data to the secret URL
        await fetch(secretUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body) 
        });

        // 3. Tell GHL it worked!
        res.status(200).json({ message: "Sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.listen(3000, () => console.log('Middleman is awake!'));