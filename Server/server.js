//server.js

// Required External Modules\
const express = require('express');
const path = require('path');
//spawn is used to run python code in conjunction with node
const {spawn} = require('child_process');

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
var cors = require('cors');

let newFilename = "";
let results_file = "";
//connect ot mysql database

//need to set up mysql on computer and change these fields to fit your information for database to work
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

//app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());

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
   let fileName1 = "";
   let fileName2 = "";
   let targetName = "";
   const tempDate = new Date();
   const id = '' + tempDate.getFullYear() + '' + (tempDate.getMonth() + 1) + '' + tempDate.getDate() + '' + tempDate.getHours() + '' + tempDate.getMinutes() + '' + tempDate.getSeconds() + '' + tempDate.getMilliseconds();
   //DO I NEED THIS???
   newFilename = req.files[0].filename.split(".")[0]; //+ req.files[1].filename.split(".")[0];
   if (!req.files) {
      console.log("No file recieved");
      message = "Error! in image upload.";
      //res.render('Files', {message, status:'danger'});
   } else if (req.files.length == 2) {
      console.log('2 files recieved');
      fileName1 = req.files[0].filename;
      fileName2 = req.files[1].filename;
      targetName = req.body.target;
      results_file = fileName2 + "_subset_vs_" + targetName + ".txt";
      results_file = results_file.replace(/.fasta/g, "");
      var sql = "INSERT INTO `Files`(`fileName1`, `fileName2`, `targetName`, \
                                        `isLoading`, \
                                        `type1`, `type2`, \
                                        `size1`, `size2`, \
                                        `new_name1`, `new_name2`, \
                                        `id`, `results_file`) \
                    VALUES ('" +
         req.files[0].originalname + "', '" +
         req.files[1].originalname + "', '" +
         targetName + "', '" +
         0 + "','" +
         req.files[0].mimetype + "', '" +
         req.files[1].mimetype + "', '" +
         req.files[0].size + "', '" +
         req.files[1].size + "', '" +
         fileName1 + "', '" +
         fileName2 + "', '" +
         req.body.id + "', '" +
         results_file + "')"

         var query = db.query(sql, function(err, result) {
            console.log('inserted file1 and file2 data');
         });

      //---------------------------------------------------------
      //this is where the python code for PAW_BLASTER should go
      //---------------------------------------------------------
      var dataToSend;
      // spawn new child process to call the python script
      const python = spawn('python3', ['PAW_BLAST/make_subset_DB_from_list_3.py',
         'uploads/' + fileName1, 'uploads/' + fileName2,
         'refseq_databases/' + targetName, 'false']);
      // collect data from script
      python.stdout.on('data', function (data) {
         console.log('Pipe data from python script ...');
         dataToSend = data.toString();
      });
      // in close event we are sure that stream from child process is closed
      python.on('close', (code) => {
         console.log(`child process close all stdio with code ${code}`);
         //updates sql when python script is done running
         var updatesql = "UPDATE `Files` SET `isLoading` = '" +
                              1 + "' WHERE `id` = '" +
                              req.body.id + "'"
         query = db.query(updatesql, function(err, result) {
            console.log('updated file1 and file2 data');
         });

         // send data to browser
         res.send(dataToSend);
      });

      message = "Successfully uploaded!";
      //res.render('Files', {message, status:'success'});
   } else if (req.files.length == 1) {
      console.log("1 file recieved");
      fileName1 = req.files[0].filename;
      fileName2 = req.body.refseqName;
      targetName = req.body.target;
      results_file = fileName2 + "_subset_vs_" + targetName + ".txt";
      results_file = results_file.replace(/.fasta/g, "");
      var sql = "INSERT INTO `Files`(`fileName1`, `fileName2`, `targetName`, \
                                        `isLoading`, \
                                        `type1`, `type2`, \
                                        `size1`, `size2`, \
                                        `new_name1`, `new_name2`, \
                                        `id`, `results_file`) \
                    VALUES ('" +
         req.files[0].originalname + "', '" +
         fileName2 + "', '" +
         targetName + "', '" +
         0 + "', '" +
         req.files[0].mimetype + "', '" +
         "mimetype" + "', '" +
         req.files[0].size + "', '" +
         123456 + "', '" +
         fileName1 + "', '" +
         fileName2 + "', '" +
         req.body.id + "', '" +
         results_file + "')"

      var query = db.query(sql, function(err, result) {
         console.log('inserted file1 and refseq data');
      });

      //---------------------------------------------------------
      //this is where the python code for PAW_BLASTER should go
      //---------------------------------------------------------
      var dataToSend;
      // spawn new child process to call the python script
      const python = spawn('python3', ['PAW_BLAST/make_subset_DB_from_list_3.py',
         'uploads/' + fileName1, 'refseq_databases/' + fileName2,
         'refseq_databases/' + targetName, 'false']);
      // collect data from script
      python.stdout.on('data', function (data) {
         console.log('Pipe data from python script ...');
         dataToSend = data.toString();
      });
      // in close event we are sure that stream from child process is closed
      python.on('close', (code) => {
         console.log(`child process close all stdio with code ${code}`);
         //updates sql when python script is done running
         var updatesql = "UPDATE `Files` SET `isLoading` = '" +
                              1 + "' WHERE `id` = '" +
                              req.body.id + "'"
         query = db.query(updatesql, function(err, result) {
            console.log('updated file1 and file2 data');
         });

         // send data to browser
         res.send(dataToSend);
      });

      message = "Successfully uploaded!";

   } else {
      console.log("error, incorrect number of files recieved");
   }
});

app.get('/downloads', (req, res) => {
   var fileLocation = path.join('./uploads', results_file);
   res.download(fileLocation, results_file);
});

app.get('/:fileId', upload.array('selectedFile', 2), (req, res) => {
   console.log("GET");
   var fileId = req.params.fileId;
   var sql = "SELECT * FROM `Files` WHERE `id` = '" + fileId + "'";
   var query = db.query(sql, function(err, result) {
      var string=JSON.stringify(result);
      var json =  JSON.parse(string);
      results_file = json[0].results_file;
      res.send(result);
   });


});

// Server Activation

const server = app.listen(port, () => {
   console.log(`Listening to requests on http://localhost:${port}`);
});
