/* 
    Simple express app that runs a emailing service,
    using mailgun-js.
*/

import express from "express";
import mailgun from "mailgun-js";

require('dotenv').load();

///////////////////////////////////////////////////////////////////////////////
// Setup app                                                                 //
///////////////////////////////////////////////////////////////////////////////

var app = express(),
    port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'pug');

///////////////////////////////////////////////////////////////////////////////
// Routing                                                                   //
///////////////////////////////////////////////////////////////////////////////

app.get('/', function(req, res) {

    res.render('index.html', function(err, html) {
        if (err) {
            console.log(err);
        } else {
            res.send(html);
        }
    });

});

app.get('/email/:mail', function(req, res) {

    let mg = new mailgun({apiKey: api_key, domain: domain})
});

///////////////////////////////////////////////////////////////////////////////
// Start                                                                     //
///////////////////////////////////////////////////////////////////////////////

app.listen(port);

console.log('server started on: ' + port);