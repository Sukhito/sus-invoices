var express         =   require('express');
var app             =   express();

var mongoose        =   require('mongoose');
var bodyParser      =   require('body-parser');
var methodOverride  =   require('method-override');

var db = require('./config/db');
var connection = mongoose.connect(db.url);
var port = process.env.PORT || 8082;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require('./app/routes/item')(app);
require('./app/routes/invoice')(app);

require('./app/routes/printer')(app);


app.listen(port);

console.log("Server at " + port);