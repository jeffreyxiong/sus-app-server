require("babel-core").transform("code", options);

import express from "express";
import mailgun from "mailgun-js";

var app = express(),
    port = process.env.PORT || 3000;

app.listen(port);

console.log('server started on: ' + port);