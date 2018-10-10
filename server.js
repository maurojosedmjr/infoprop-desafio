var http = require('http'),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyparser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    port = process.env.PORT || 3000;


var configDB = require('./config/database.js');
mongoose.connect(configDB.url, { useNewUrlParser: true });
var db = mongoose.connection;

app.set('view engine', 'ejs');

app.use(bodyparser.json());

app.use(fileUpload());

//routes
var routes = require('./app/routes.js')(app);

var server = http.createServer(app);
server.listen(port);
console.log('Server running on port: ' + port);

module.exports = server;
