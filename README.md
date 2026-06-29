# GoHighLevel Webhook Proxy

This is a lightweight "Middleman" server built with Node.js and Express. It is designed to safely forward data from a GoHighLevel (GHL) automation to a secret inbound webhook (like Zapier or Make) without exposing the final destination URL in the GHL execution logs.

## How It Works

1. GoHighLevel sends a POST request to this proxy server's public URL.
2. This proxy server receives the data payload.
3. The server silently forwards the exact same data to a hidden URL stored securely in Environment Variables.
4. The final destination receives the data, and anyone looking at GoHighLevel only ever sees the proxy URL.

## Setup Instructions

To run this project, you need to host it on a cloud platform like Render, Railway, or Heroku. 

### Environment Variables
For security, the destination webhook is kept out of the code. You **must** set up the following environment variable in your hosting platform for this server to work properly:

* `SECRET_WEBHOOK_URL` - The actual destination webhook URL you want to hide (e.g., `https://hooks.zapier.com/...`)

### Deployment Steps

1. Connect this GitHub repository to your cloud hosting platform.
2. Go to the settings/environment variables section of your host and add the `SECRET_WEBHOOK_URL` variable.
3. Deploy the application.
4. Copy the new public URL provided by your host and add `/forward` to the end of it (e.g., `https://your-app-name.onrender.com/forward`).
5. Paste that complete URL into your GoHighLevel Webhook action as a POST request.
