'use strict';
const http = require('http');
const url = require('url');
const util = require('util');

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var paras = url.parse(request.url, true).query;
    console.log(pathname);
    route(handle, pathname, response, request, paras);
  }
  util.log("listen: localhost:8001");
  http.createServer(onRequest).listen(8001);
}

exports.start = start;