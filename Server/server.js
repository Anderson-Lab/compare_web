//server.js

// Required External Modules\
const express = require('express');
const path = require('path');
//var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const router = require('./Routes/Files.js');
const {
   v4: uuidv4
} = require('uuid');
//const url = "http://localhost:3000";
const mysql = require('mysql');
const refseq_database = "./refseq_database";
const fs = require('fs');

let newFilename = "";
//connect ot mysql database
//need to set up mysql on compiuter and change these fields to fit your information for database to work
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'jtan26',
   password: 'esme0522',
   database: 'compare_web'
});

connection.connect();

global.db = connection;


// configure storage
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
      cb(null, './uploads');
   },
   filename: (req, file, cb) => {
      /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
      newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
   },
});
// create the multer instance that will be used to upload/save the file
const upload = multer({
   storage
});

// App Variables
const app = express();
const port = process.env.PORT || 5000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, 'public')));



app.post('/', upload.array('selectedFile', 2), (req, res) => {
   /*
     We now have a new req.file object here. At this point the file has been saved
     and the req.file.filename value will be the name returned by the
     filename() function defined in the diskStorage configuration. Other form fields
     are available here in req.body.
   */
   console.log(req.body);
   console.log("HERE");
   console.log("Number of Files: " + req.files.length);
   console.log(req.files);
   //DO I NEED THIS???
   newFilename = req.files[0].filename.split(".")[0]; //+ req.files[1].filename.split(".")[0];
   if (!req.files) {
      console.log("No file recieved");
      message = "Error! in image upload.";
      //res.render('Files', {message, status:'danger'});
   } else if (req.files.length == 2) {
      console.log('2 files recieved');
      console.log(req.files);
      console.log(req.files[0]);
      console.log(req.files[1]);
      console.log(req.files[0].originalname);
      var sql = "INSERT INTO `Files`(`fileName1`, `fileName2`, \
                                        `refseq`, \
                                        `type1`, `type2`, \
                                        `size1`, `size2`, \
                                        `new_name1`, `new_name2`, \
                                        `id`) \
                    VALUES ('" +
         req.files[0].originalname + "', '" +
         req.files[1].originalname + "', '" +
         0 + "','" +
         req.files[0].mimetype + "', '" +
         req.files[1].mimetype + "', '" +
         req.files[0].size + "', '" +
         req.files[1].size + "', '" +
         req.files[0].filename + "', '" +
         req.files[1].filename + "', '" +
         req.files[0].originalname + "')"

      var query = db.query(sql, function(err, result) {
         console.log('inserted file1 and file2 data');
      });

      message = "Successfully uploaded!";
      //res.render('Files', {message, status:'success'});
   } else if (req.files.length == 1) {
      console.log("1 file recieved");
      console.log(req.body.refseqName);

      console.log(req.files[0].originalname);
      console.log(req.files[0].size);
      var sql = "INSERT INTO `Files`(`fileName1`, `fileName2`, \
                                        `refseq`, \
                                        `type1`, `type2`, \
                                        `size1`, `size2`, \
                                        `new_name1`, `new_name2`, \
                                        `id`) \
                    VALUES ('" +
         req.files[0].originalname + "', '" +
         "testoriginalname" + "', '" +
         1 + "', '" +
         req.files[0].mimetype + "', '" +
         "testmimetype" + "', '" +
         req.files[0].size + "', '" +
         123456 + "', '" +
         req.files[0].filename + "', '" +
         req.body.refseqName + "', '" +
         req.files[0].originalname + "')"

      var query = db.query(sql, function(err, result) {
         console.log('inserted file1 and refseq data');
      });

   } else {
      console.log("error, incorrect number of files recieved");
   }
});

app.get('/:fileId', upload.array('selectedFile', 2), (req, res) => {
   console.log("GET");
   console.log(newFilename);
   console.log(req.params.fileId);
   var fileId = req.params.fileId;
   var sql = "SELECT * FROM `Files` WHERE `id` = '" + fileId + "'";
   var query = db.query(sql, function(err, result) {
      console.log(result);
      res.send(result);
   });
});


// Server Activation

app.listen(port, () => {
   console.log(`Listening to requests on http://localhost:${port}`);
});
