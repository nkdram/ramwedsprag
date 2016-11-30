



var app = require('./config/app')();

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
//app.listen(app.get('port'));

var http = require('http');

var httpServer = http.Server(app);
httpServer.listen(app.get('port'), function(){
    console.log("server listening on port", app.get('port'));
});


var io = require('socket.io').listen(httpServer);
io.set("transports", ["xhr-polling"]);
io.set("polling duration", 10);
io.on('connection', function(socket) {
    console.log('socket.io connected');
    socket.on('crawl', function(data) {
        var crawler = require('./controllers/zombie.server.controller');
        crawler.crawlUsingSocket(data, socket, function(result){
            socket.emit('crawlDone',{ result: result });
        });
    });



    socket.on('sendEmail', function(data) {
        /*var secretLink = speakeasy.generateSecret({length: 100});
        var code = speakeasy.totp({
            secret: secretLink.base32,
            encoding: 'base32'
        });
        console.log('Inside Register');


        var link = domain.domainName+"/#!/activate?uid="+secretLink.base32;
        var fullName = data.donarData.firstName+' '+data.donarData.lastName;*/

        var postmark = require('./controllers/postmark.mail.controller');



        if(data.email) {
            postmark.sendMail(data.email, 'Thanks for Registering - Please verify your emailID to Donate', data.firstname, 'asdada',
                function () {
                    socket.emit('emailSent', {message: "", success: "Email Sent!"});
                });
        }
        else {
            socket.emit('emailSent', {message: "", success: "Please provide Email Id!"});
        }
    });
});


// Expose app
exports = module.exports = app;

// Logging initialization
console.log('RamWedsPragatha APP started on port 8079');