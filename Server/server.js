//server.js

// Required External Modules\
const express = require('express');
const path = require('path');

// App Variables
const app = express();
const port = process.env.PORT || 8080

// App Configuration
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes Definitions
app.get("/", (req, res) => {
   res.status(200).send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});



// Server Activation

app.listen(port, () => {
   console.log(`Listening to requests on http://localhost:${port}`);
});
