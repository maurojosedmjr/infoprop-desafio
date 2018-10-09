var http = require('http'),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyparser = require('body-parser'),
    port = process.env.PORT || 3000;


var configDB = require('./config/database.js');
mongoose.connect(configDB.url, { useNewUrlParser: true });
var db = mongoose.connection;

app.set('view engine', 'ejs');


// app.use(bodyparser.urlencoded({
// 	extended: true
// }));
app.use(bodyparser.json());

//routes
var routes = require('./lib/routes.js')(app);

var server = http.createServer(app);
server.listen(port);
console.log('Server running on port: ' + port);

module.exports = server;
