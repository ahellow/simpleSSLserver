const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');
const tls = require('tls');
const { Server } = require('http');


const app = express();
console.log('hej');
//
app.use('/', (req, res) => {
    res.send('hello world')
    
})

//finds the private key and certificate
const httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);

httpsServer.listen(3443);

