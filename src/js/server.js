// server.js

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Define a route to proxy image requests
app.get('/images/:imageName', async (req, res) => {
  try {
    // Fetch the image from the external server
    const imageUrl = `http://server-nodejs.cit.byui.edu:3000/images/${req.params.imageName}`;
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Set the appropriate headers and send the image as the response
    res.set('Content-Type', 'image/jpeg'); // Adjust content type as needed
    res.send(imageResponse.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
