'use strict';





exports.index = function(req, res) {

    console.log('Ram Weds Pragatha REQUEST');
    res.render('index', {
        user: req.user || null
    });
};