/* 
    Simple express app that runs a emailing service,
    using mailgun-js.
*/

import express from 'express';
import mailgun from 'mailgun-js';
import multer from 'multer';
import dv from 'dotenv';

///////////////////////////////////////////////////////////////////////////////
// Setup app                                                                 //
///////////////////////////////////////////////////////////////////////////////
dv.load();

var app = express(),
    port = process.env.PORT || 3000;

// app.use(express.static(__dirname + '/views'));
app.set('view engine', 'pug');

///////////////////////////////////////////////////////////////////////////////
// Routing                                                                   //
///////////////////////////////////////////////////////////////////////////////

app.post('/email', function(req, res) {

    // Start mailgun
    let mg = new mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN})
    
    // Get data
    var file = req.file;
    var email = req.body.email;
    var study = req.body.study;

    var data = {
        from: 'jx13@rice.edu',
        to: email,
        subject: 'SUS App Data - ' + study,
        attachment: file,
        html: 'Your study data is attached as a tab-delimited file.'
    }
    
    mailgun.messages().send(data, function(err, body) {
        if (err) {
            console.log('Error sending email.');
            res.status(300).end();
        } else {
            console.log(body);
            res.status(200).end();
        }
    });
});

///////////////////////////////////////////////////////////////////////////////
// Start                                                                     //
///////////////////////////////////////////////////////////////////////////////

app.listen(port);