'use strict';

var passport  = require('passport');

module.exports = function(app) {
    var core = require('../controllers/core.controller');
    var crawl = require('../controllers/zombie.server.controller');

    app.use(function (req, res, next) {
        if (req.query.access_token) {
            passport.authenticate('bearer', function (err, user) {
                if (err || !user) {
                    console.log(req._startTime + ', token: ' + req.query.access_token + ', from: ' + req.headers.host + ', browser: ' + req.headers['user-agent']);
                    return res.send(401, {
                        message: 'User not authenticated. Please check API token or contact administrator.'
                    });
                }
                req.login(user, function (err) {
                    if (err) {
                        return res.send(401, {
                            message: 'User not authenticated using token.'
                        });
                    }
                    //db.Loginacitivity( req, res, user );
                    next();
                });
            })(req, res, next);
        } else {
            next();
        }
    });

    app.route('/').get(core.index);
    app.route('/crawl').get(crawl.crawlUsingZombie);

    var fs = require("fs"),path = require('path');
    app.route('/google3fcea92c1635b425.html').get(function(request, response) {
        fs.readFile(path.resolve("./google3fcea92c1635b425.html"), function(err, data){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        });
    });
    app.route('/sitemap.html').get(function(request, response) {
        fs.readFile(path.resolve("./sitemap.html"), function(err, data){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        });
    });
    app.route('/sitemap.xml').get(function(request, response) {
        fs.readFile(path.resolve("./sitemap.xml"), function(err, data){
            response.writeHead(200, {'Content-Type': 'text/xml'});
            response.write(data);
            response.end();
        });
    });

    app.route('/robots.txt').get(function(request, response) {
        fs.readFile(path.resolve("./robots.txt"), function(err, data){
            response.writeHead(200, {'Content-Type': 'text/txt'});
            response.write(data);
            response.end();
        });
    });

    app.route('/.well-known/acme-challenge/YhKDxVlEaiaxGKkaTG2ui6VwVQdD1DmYRa9XGdiuxPE').get(function(request, response) {
        fs.readFile(path.resolve("./.well-known/acme-challenge/YhKDxVlEaiaxGKkaTG2ui6VwVQdD1DmYRa9XGdiuxPE"), function(err, data){
            response.writeHead(200, {'Content-Type': 'text/txt'});
            response.write(data);
            response.end();
        });
    });

    app.route('/.well-known/acme-challenge/nIu50tFCubdXC4yJ0yjaNIxR1DIn37OlD7s3_x4Pd14').get(function(request, response) {
        fs.readFile(path.resolve("./.well-known/acme-challenge/nIu50tFCubdXC4yJ0yjaNIxR1DIn37OlD7s3_x4Pd14"), function(err, data){
            response.writeHead(200, {'Content-Type': 'text/txt'});
            response.write(data);
            response.end();
        });
    });
};