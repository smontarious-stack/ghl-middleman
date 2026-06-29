require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json()); 

app.post('/forward', async (req, res) => {
    console.log("1. Knock on the door received from GoHighLevel!");
    try {
        const secretUrl = process.env.SECRET_WEBHOOK_URL;
        
        // This will tell us if Render actually has your secret URL saved
        if (secretUrl) {
            console.log("2. Secret URL found in the safe!");
        } else {
            console.log("2. URGENT: Secret URL is MISSING from Render Environment Variables!");
        }

        const response = await fetch(secretUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body) 
        });

        console.log("3. Data sent to destination. Success:", response.ok);
        res.status(200).json({ message: "Sent successfully!" });
    } catch (error) {
        // This will print the exact reason it crashed into your Render logs!
        console.error("ERROR CAUGHT:", error.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.listen(3000, () => console.log('Middleman is awake!'));
