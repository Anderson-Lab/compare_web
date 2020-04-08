
exports.profile = function(req, res){
   console.log("Files.js ----");
	var message = '';
	var new_name = req.params.new_name;
   var sql="SELECT * FROM `Files` WHERE `new_name`='"+new_name+"'";
   db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "File not found!";

     res.render('file.ejs',{data:result, message: message});
   });
};
