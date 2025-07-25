'use strict';

const log = require('hexo-log').default({
    debug: false,
    silent: false
});

const logger = {
    info: function (content) {
        log.info(`[Bangumi Gallery] ${content}`)
    },

    warn: function (content) {
        log.warn(`[Bangumi Gallery] ${content}`)
    },

    error: function (content) {
        log.error(`[Bangumi Gallery] ${content}`)
    }
}

module.exports = logger