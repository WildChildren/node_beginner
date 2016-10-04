'use strict';
const util = require('util');

function route(handle, pathname, response, request, paras) {
    switch(typeof handle[pathname]) {
      case 'function':
        handle[pathname](request, response, paras);
        break;
      case 'string':
        util.log(handle[pathname]);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(handle[pathname]);
        response.end;
        break;
      default :
        util.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
        break;
    }
}

exports.route = route;