var config = {
	channels: ["#pcper"],
	server: "irc.mibbit.net",
	botName: "pcperbot"
};


var irc = require('irc');
var express = require('express');
var path = require('path');

var app = express();
app.locals.started = false;
var msg = '';

var hour = 3600000;
var day = (hour * 24);
var week = (day * 7);
var month = (day * 30);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));
app.use(express.bodyParser());
app.get('/', function(req,res) {
	res.render('index');
    });

app.post('/bot', function(req, res) {
	console.log(req.body);
	if(app.locals.started == true) {
	  bot.disconnect();
		bot = {};
		app.locals.started = false;

		res.send({selected: getRandomUser()});

		conntestants = [];
	} else {
		res.send(200);
		bot = new irc.Client(req.body.server, req.body.name,{
			channels: [req.body.channel]
		});

		bot.addListener("message", function(from, to, text, message) {
			console.log('new message');
			if(text.toUpperCase() == req.body.targetString.toUpperCase() && contestants.indexOf(message.nick) == -1) {
					console.log('added');
					contestants.push(message.nick);
			}
		});
		app.locals.started = true
	}
});

var contestants = [];


var getRandomUser = function() {
    console.log('random called');
    return contestants[Math.floor(((Math.random() * 1000000) % contestants.length))];
};
/*
process.on('SIGINT', function(code) {
  // do *NOT* do this
	console.log(getRandomUser());
	setTimeout(function() {
		process.exit(1);
	    }, 200);
});*/

app.listen(3500);
