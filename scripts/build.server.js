process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
    throw err;
});

require('../config/env');
const fs = require('fs-extra');
const weback = require('webpack');
const config = require('../config/webpack.config.server');
const paths = require('../config/paths');