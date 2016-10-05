'use strict';
const querystring = require("querystring"),
    formidable = require("formidable"),
    fs = require("fs"),
    util = require('util'),
    commons = require('../../conmons');

function index(request, response, paras) {
  let htmlText = '<html> \
    <head> \
    <meta http-equiv="Content-Type" content="text/html; \
    charset=UTF-8" /> \
    </head> \
    <body> \
    <h1>Hello word!</h1> \
    <hr> \
    <h2>Here is show how to make a form</h2> \
    <form method="post" action="/upload" enctype="multipart/form-data"> \
    <label for="text">text: </label><input id="text" type="text" name="text"> <br>\
    <label for="text">file: </label><input id="file" type="file" name="file"> <br>\
    <button> submit </button><br>\
    </form> \
    </body> \
    </html>';
  response.writeHead(200, 'text/html');
  response.write(htmlText);
  response.end();
}

function upload(request, response, paras) {
  let htmlText = '<html> \
    <head> \
    <meta http-equiv="Content-Type" content="text/html; \
    charset=UTF-8" /> \
    </head> \
    <body> \
    <h2>Here is your form paras: </h2> \
    <label for="text">text: </label>';

    /**
     * how to get form data
     */
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.stat(commons.path('files'), function(error, stats) {
            if (error) {
                fs.mkdirSync(commons.path('files'));
            }
            let file = files.file;
            if (file.size > 0) fs.renameSync(file.path, commons.path(`files/${file.name}`));
            else file.name = '404.png';
            response.writeHead(200, {"Content-Type": "text/html"});
            htmlText += `${fields.text} <br> `;
            htmlText += `received image:<br/> \
                        <img src='/show?png=${file.name}' /> \
                        </body> \
                        </html>`;
            response.write(htmlText);
            response.end();
        });
    });
}

function show(request, response, paras) {
  console.log("Request handler 'show' was called.");
  fs.readFile(commons.path(`files/${paras.png}`), "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.index = index;
exports.upload = upload;
exports.show = show;