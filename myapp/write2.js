// write to file

const express = require('express')
const app = express()
var fs = require('fs');

app.get('/', function (req, res) {
  res.send('This pgm will write test string to file');
  var data = "this is a test. ABCDEFGHIJK";
  fs.writeFile('output.json', JSON.stringify(data, null, 4), function(err){
     if(err) { 
        return console.log("Cannot write" + err);
     }
     console.log('File successfully written! - Check your project directory for the output.json file');
    }
  );
})

app.listen(3000, function () {
  console.log('Old hello world app listening on port 3000!')
})



