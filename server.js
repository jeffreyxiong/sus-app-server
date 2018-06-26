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
    upload = multer().single('file'),
    port = process.env.PORT || 3000;

// app.use(express.static(__dirname + '/views'));
app.set('view engine', 'pug');

///////////////////////////////////////////////////////////////////////////////
// Routing                                                                   //
///////////////////////////////////////////////////////////////////////////////

app.post('/email', function(req, res) {

    // Start mailgun
    let mg = new mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN})
    
    upload(req, res, function(err) {
        if (err) {
            console.log('Error parsing multipart request.');
            res.status(300).end();
        } else {
            console.log(req.body);
            
            // Get data
            var file = req.file,
                email = req.body.email,
                product = req.body.product,
                attachment = new mg.Attachment({
                    data: file.buffer,
                    filename: file.originalname,
                    knownLength: file.size,
                    contentType: file.mimetype
                });

            var data = {
                from: 'jx13@rice.edu',
                to: email,
                subject: 'SUS App Data - ' + product,
                attachment: attachment,
                html: 'Your product data is attached as a tab-delimited file.'
            }
            
            mg.messages().send(data, function(err, body) {
                if (err) {
                    console.log(err);
                    res.status(300).end();
                } else {
                    console.log('Emailed successfully.')
                    res.status(200).end();
                }
            });
        }
    });
});

///////////////////////////////////////////////////////////////////////////////
// Start                                                                     //
///////////////////////////////////////////////////////////////////////////////

app.listen(port);