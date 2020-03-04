//server.js

// Required External Modules\
const express = require('express');
const path = require('path');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


// App Variables
const app = express();
const port = process.env.PORT || 5000


app.use(fileUpload());

//Upload Endpoint
app.post('/upload', (req, res) => {
   if(req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded'});
   }

   const file = req.files.file;

   file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if(err) {
         console.error(err);
         return res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
   });
});


// App Configuration
// Serve static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));
/*app.use(function(req, res, next) {
   if(req.path !== '/'){
      console.log("Handling " + req.path + '/' + req.method);
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Credentials", true);
      res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
      res.header("Access-Control-Expose-Headers", "Location");
      res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
      next();
   }else{
      res.status(404).end();
      console.log("HELLO");
   }

});*/

// No further processing needed for options calls.
//app.options("/*", function(req, res) {
//   res.status(200).end();
//});

// Static path to index.html and all clientside js
// Parse all request bodies using JSON
//app.get("/", (req, res) => {
//   res.status(200).send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
//});

//app.use(bodyParser.json());

// Attach cookies to req as req.cookies.<cookieName>
//app.use(cookieParser());


// Load Subroutes
//app.use('/Files', require('./Routes/Files.js'));


// Server Activation

app.listen(port, () => {
   console.log(`Listening to requests on http://localhost:${port}`);
});
