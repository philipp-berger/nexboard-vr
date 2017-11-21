// @flow

// This is magic
// Basically, webpack.DefinePlugin replaces process.env.NODE_ENV with "production"
// for the production build, resulting in ('production' === 'development') as the
// condition which causes webpack to recognize one or the other require()-statement
// to be unreachable and not include the dependency tree behind it in the bundle
//
// tl;dr -> e.g. do not include redux-logger in production bundle
if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dev.js');
} else {
  module.exports = require('./prod.js');
}
