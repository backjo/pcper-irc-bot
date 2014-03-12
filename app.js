var config = {
	channels: ["#pcper"],
	server: "irc.mibbit.net",
	botName: "pcperbot"
};

if(process.argv.length != 3) {
    console.log("Usage: node " + process.argv[1] + " <word to search for>");
    process.exit();
}


var irc = require('irc');
var msg = process.argv[2];

var bot = new irc.Client(config.server, config.botName, {
	channels: config.channels
});

var contestants = [];

bot.addListener("message", function(from, to, text, message) {
	console.log('new message');
	if(text == msg && contestants.indexOf(message.user) == -1) {
	    console.log('added');
	    contestants.push(message.nick);
	}
});

var getRandomUser = function() {
    console.log('random called');
    return contestants[Math.floor(((Math.random() * 1000000) % contestants.length))];
};

process.on('SIGINT', function(code) {
  // do *NOT* do this
	console.log(getRandomUser());
	setTimeout(function() {
		process.exit(1);
	    }, 200);
});
