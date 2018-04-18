import express from "express";
import mailgun from "mailgun-js";
import routes from "./router";

// Setup app    
var app = express(),
    port = process.env.PORT || 3000;

// Get routes
routes(app);

// Start on port
app.listen(port);

console.log('server started on: ' + port);