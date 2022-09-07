var fs = require("fs");
fs.readFile("./data.txt", "utf8", function(err, data) {console.log(data.length);});
fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });