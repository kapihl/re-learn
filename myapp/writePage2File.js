// get html page, write to file

const express = require('express');
const app = express();
// var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

// data = content of url or "Error"
var data = "";

app.listen(3000, function () {
  console.log('Get hardcoded page, write to console. Listen on port 3000!')
});

app.get('/', function (req, res) {
  res.send('This pgm will write test string to file');

  // get hardcodet html page
  request({
    method: 'GET',
    url: 'https://www.dr.dk/tv/oversigt'
  }, function(err, response, body){
    if(err) return console.error(err);
    data = body;
    toFile();
  });
});

function toFile(){
  fs.writeFile('myPage.json', JSON.stringify(data, null, 4), function(err){
     if(err) { 
        return console.log("Cannot write" + err);
     }
     console.log('File successfully written! - Check your project directory for the myPage.json file');
    }
  );
}

