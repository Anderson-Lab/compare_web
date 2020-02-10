//server.js

// Required External Modules\
const express = require('express');
const path = require('path');

// App Variables
const app = express();
const port = process.env.PORT || 3001

// App Configuration

// Routes Definitions
app.get("/", (req, res) => {
   res.status(200).send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});

// Server Activation

app.listen(port, () => {
   console.log(`Listening to requests on http://localhost:${port}`);
});
