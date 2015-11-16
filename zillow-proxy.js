'use strict';

/**
 * This is a proxy server for the annoying zillow api stuff.
 * Any time you call their api, use http://localhost:3000/api_call_here
 * and you should get the data back correctly.
 */

// code from http://stackoverflow.com/questions/20351637/how-to-create-a-simple-http-proxy-in-node-js

var http = require('http');
var parser = require('xml2json');

http.createServer(onRequest).listen(3000);

function onRequest(request, response) {

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'text/json');

  var options = {
    hostname: 'www.zillow.com',
    port: 80,
    path: request.url,
    method: 'GET'
  };

  var proxy = http.request(options, (res) => {

    res.on('data', (chunk) => {
      console.log(chunk.toString());
      // console.log(chunk.toString());
      //console.log(chunk.toString());

      var json = parser.toJson(chunk.toString());
      console.log(json);

    });

    res.pipe(response, {
      end: true
    });
  });

  request.pipe(proxy, {
    end: true
  });
}
