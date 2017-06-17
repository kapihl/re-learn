// prereq: html file on local machine, in variable localFile.
// invoke: localhost:3000/{hello|buttons|external}

var localFile = "simplePage.html";
const express = require('express');
const cheerio = require('cheerio');
const app = express();
var request = require('request');

var fs = require('fs');

app.listen(3000, function () {
  console.log('Port 3000!');
  console.log('Invoke: hello => hello world, buttons => html w. buttons, external => get page');
});

// get and return external html-page
app.get('/external', function (req, res, url){
  var hasUrl = false;
  if (typeof req.query.url != 'undefined') {
    hasUrl = true;
    url    = req.query.url;
  }
  if (!hasUrl) throw res.error;
  // url exists, get page and return it
  console.log("------------------------");
  console.log("fetching external page");
  getPage(function(data){
    console.log("URL is : " + url);
    res.setHeader('Content-Type', 'text/html');
    var baseStr = "<base href=" + url + "/>";
    var comment = "<!-- NB: This page was altered by serveMultiReqs.js -->";
    $ = cheerio.load(data);
    $('body').prepend(comment);
    $('head').prepend(baseStr);
    res.send($.html());
  }, url);
});

// get page: param theUrl
function getPage(cb, theUrl){
  urlStr = theUrl;
  console.log("in getPage, url is: " + theUrl);
  request({
    method: 'GET',
    url: urlStr
  }, function(err, response, data){
    if(err) return console.error(err);
    cb(data);
  });
}

// read page from file
app.get('/buttons', function (req, res){
  readHtml(function(data){
    console.log("Page :\n" + data);
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
});

// build simple html file inline
app.get('/hello', function (req, res){
  console.log("simple page");
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>');
  res.write('<body>');
  res.write('<h1>Hello, World - go node.js!</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
});

// load file from local machine, app folder
function readHtml(cb){
  var result = "";
  fs.readFile(localFile, function (err, data) {
    if (err) throw err;
    console.log("page read");
    cb(data);
  });
}


