'use strict';
const Server = require('../server');
const Router = require('../router');

const formExample = require('./example/formExample');

const handle = {
    '/' : formExample.index,
    '/upload' : formExample.upload,
    '/show' : formExample.show
};

Server.start(Router.route, handle);
