require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json()); 

app.post('/forward', async (req, res) => {
    console.log("1. Knock on the door received from GoHighLevel!");
    
    // THE BLUEPRINT: Packing the box exactly how the destination GHL wants it
    const mappedData = {
        "1": req.body["1"] || "",
        "Payment": req.body["Payment"] || "",
        "Password": req.body["Password"] || "",
        "Traveler 1": req.body["Traveler 1"] || "",
        "Select Service": req.body["Select Service"] || "",
        "Destination": req.body["Destination"] || "",
        "Game Answer 1": req.body["Game Answer 1"] || "",
        "Depart": req.body["Depart"] || "",
        "Game Answer 2": req.body["Game Answer 2"] || "",
        "Source From Games": req.body["Source From Games"] || "",
        "Number Of Locations": req.body["Number Of Locations"] || "",
        "Traveler 2": req.body["Traveler 2"] || "",
        "B-018-GLB_ SMS Optin Date": req.body["B-018-GLB_ SMS Optin Date"] || req.body["B-018-GLB. SMS Optin Date"] || "",
        "AI Message ( HTML)": req.body["AI Message ( HTML)"] || "",
        "Trip": req.body["Trip"] || "",
        "No_ of Missed Calls": req.body["No_ of Missed Calls"] || req.body["No. of Missed Calls"] || "",
        "Graycious Travel Package(s)": req.body["Graycious Travel Package(s)"] || "",
        "URL_Link_Travel_Agemts": req.body["URL_Link_Travel_Agemts"] || "",
        "Travel Package(s)": req.body["Travel Package(s)"] || "",
        "Game Answer 3": req.body["Game Answer 3"] || "",
        "Additional Information": req.body["Additional Information"] || "",
        "Username": req.body["Username"] || "",
        "Services Needed": req.body["Services Needed"] || "",
        "Shine State Services Quote Request": req.body["Shine State Services Quote Request"] || [],
        "B-018-COI_ SMS Optin": req.body["B-018-COI_ SMS Optin"] || req.body["B-018-COI. SMS Optin"] || "",
        "Number Of Location": req.body["Number Of Location"] || "",
        "Return": req.body["Return"] || "",
        "quiz_companions": req.body["quiz_companions"] || "",
        "B-018-GLB_ SMS Opt-Out Date": req.body["B-018-GLB_ SMS Opt-Out Date"] || req.body["B-018-GLB. SMS Opt-Out Date"] || "",
        "quiz_tier": req.body["quiz_tier"] || "",
        "contact_id": req.body.contact_id || "",
        "first_name": req.body.first_name || "",
        "last_name": req.body.last_name || "",
        "full_name": req.body.full_name || "",
        "email": req.body.email || "",
        "phone": req.body.phone || "",
        "tags": req.body.tags || "",
        "country": req.body.country || "",
        "timezone": req.body.timezone || "",
        "date_created": req.body.date_created || "",
        "contact_source": req.body.contact_source || "",
        "full_address": req.body.full_address || "",
        "contact_type": req.body.contact_type || "lead",
        "location": req.body.location || {},
        "workflow": req.body.workflow || {},
        "triggerData": req.body.triggerData || {},
        "contact": req.body.contact || {},
        "attributionSource": req.body.attributionSource || {},
        "customData": req.body.customData || {},
        "headers": req.body.headers || {}
    };

    console.log("X-RAY VISION - Sending this formatted data:", JSON.stringify(mappedData));

    try {
        const secretUrl = process.env.SECRET_WEBHOOK_URL;
        
        if (secretUrl) {
            console.log("2. Secret URL found in the safe!");
        } else {
            console.log("2. URGENT: Secret URL is MISSING from Render Environment Variables!");
        }

        const response = await fetch(secretUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mappedData) 
        });

        console.log("3. Data sent to destination. Success:", response.ok);
        res.status(200).json({ message: "Sent successfully!" });
    } catch (error) {
        console.error("ERROR CAUGHT:", error.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
