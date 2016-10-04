'use strict';
const Server = require('../server');
const Router = require('../router');

const handle = {
    '/' : 'hello word!'
    // '/' : IndexController.index,
    // '/index.html' : IndexController.index,
    // '/form' : IndexController.form,
    // '/upload' : IndexController.upload,
    // '/show' : IndexController.show
};

Server.start(Router.route, handle);
