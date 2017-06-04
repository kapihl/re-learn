// get html page, write to file

const express = require('express');
const app = express();
// var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

app.get('/', function (req, res) {
  res.send('This pgm will write test string to file');
  var data = "";
  // get hardcodet html page
  request({
    method: 'GET',
    url: 'https://www.dr.dk/tv/oversigt'
  }, function(err, response, body){
    if(err) return console.error(err);
    console.log(body);
  });
});

app.listen(3000, function () {
  console.log('Get hardcoded page, write to console. Listen on port 3000!')
});

