var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var multer = require('multer');
var upload = multer();
var uname,pass
path = require('path');

const user_db={ 
    harshitha:["1","1234","https://s3.amazonaws.com/artistsnclients/k63/samples/pju_800.JPG"], 
    nikhil:["2","5678","https://cdn1.iconfinder.com/data/icons/avatars-55/100/avatar_profile_user_music_headphones_shirt_cool-512.png"], 
    chinni:["3", "9101","https://images.wisegeek.com/cartoon-girl-with-green-hair.jpg"],
    yeshwanth:["4", "2345","https://cdn1.iconfinder.com/data/icons/diversity-avatars-volume-01-circles/64/matrix-neo-man-white-512.png"]
};

var user_activity={
    harshitha:[], 
    nikhil:[], 
    chinni:[],
    yeshwanth:[]
}

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());
app.use(upload.array()); 
app.use(express.static('public'));


app.post('/myaction', function(req, res) {
  //console.log(JSON.stringify(req.body));
  uname = String(JSON.stringify(req.body.uname)).replace('"','').replace('"','');
  pass =  String(JSON.stringify(req.body.psw)).replace('"','').replace('"','');
  //res.send('success');
  console.log(uname)
  console.log(pass)
  if(user_db[uname][1]==pass){
      user_activity[uname].push(new Date().toUTCString())
      //console.log(user_activity["nikhil"])
      console.log("authenticated")
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write("<!DOCTYPE html><html><body><h1>Welcome to document page</h1><style>img {  display: inline-block;}</style><p>")
      
      if (user_activity['harshitha'].length > 0){
        res.write("<span title=\"harshitha "+user_activity['harshitha'][user_activity['harshitha'].length-1]+"\"><img src="+user_db['harshitha'][2]+" alt=\"harshitha\" width=\"50\" height=\"50\"></img></span>");
      }
      if(user_activity['nikhil'].length > 0){
        res.write("<span title=\"nikhil "+user_activity['nikhil'][user_activity['nikhil'].length-1]+"\"><img src="+user_db['nikhil'][2]+" alt=\"nikhil\" width=\"50\" height=\"50\"></img></span>");
      }
      if (user_activity['chinni'].length > 0){
        res.write("<span title=\"chinni "+user_activity['chinni'][user_activity['chinni'].length-1]+"\"><img src="+user_db['chinni'][2]+" alt=\"chinni\" width=\"50\" height=\"50\"></img></span>");
      }

      if (user_activity['yeshwanth'].length > 0){
        res.write("<span title=\"yeshwanth "+user_activity['yeshwanth'][user_activity['yeshwanth'].length-1]+"\"><img src="+user_db['yeshwanth'][2]+" alt=\"yeshwanth\" width=\"50\" height=\"50\"></img></span>");
      }
      
      res.write("</p><embed src=\"http://www.africau.edu/images/default/sample.pdf\" width=\"800px\" height=\"2100px\" /></body></html>")
      //res.sendFile('C:/Users/NikhilGurram/Pictures/harshi/document_page.html')
      res.end()
  }else{
      console.log("not authenticated")
      res.sendFile(path.join(__dirname, 'login_error.html'))
  }
  
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});
