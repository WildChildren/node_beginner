function path(url) {
  return typeof url !== 'undefined' && url !== '' ? __dirname + `/${url}` : __dirname;
}

exports.path =path;