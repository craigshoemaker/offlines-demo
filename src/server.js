var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var config = require('./config');
var app = express();
var controllers = require('./controllers');

app.set('view engine', config.viewEngineName);

app.use(express.static(__dirname + config.publicFolder));
app.use(bodyParser());
app.use(express.cookieParser('keyboard cat'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());

controllers.init(app);

var server = http.createServer(app);

console.log('Starting web server on port: ' + config.ports.website);

server.listen(config.ports.website);