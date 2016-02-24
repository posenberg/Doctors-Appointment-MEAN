var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//mongoose
require('./server/config/mongoose.js');

//routes
require('./server/config/routes.js')(app);

app.use(express.static(path.join(__dirname, './client')))
app.listen(8888, function(){console.log('Ahoy, sire! We have stuff on 8888!')})

