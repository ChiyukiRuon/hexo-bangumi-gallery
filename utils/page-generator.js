'use strict';

const ejs = require('ejs');
const path = require('path');
const {i18n} = require('./i18n');
const fs = require('hexo-fs');
const logger = require("./logger");

module.exports = async function (locals) {
    const {config} = this;
    if (!config?.bangumi_gallery?.enable) {
        return;
    }

    let {root} = config;
    if (root.endsWith('/')) {
        root = root.slice(0, root.length - 1);
    }
    let planToWatch = [];
    let watching = [];
    let completed = [];
    let lastUpdate = 'Unknown';
    if (!fs.existsSync(path.join(this.source_dir, '/_data/bangumi-gallery/bangumi.json'))) {
        logger.warn('Bangumi info not found!');
    } else {
        ({
            planToWatch,
            watching,
            completed,
            lastUpdate
        } = JSON.parse(fs.readFileSync(path.join(this.source_dir, '/_data/bangumi-gallery/bangumi.json'))));

        logger.info(`${planToWatch.length + watching.length + completed.length} bangumi loaded`);
        logger.info(`Last update: ${lastUpdate}`);
    }

    const __ = i18n.__(config.language);

    const contents = await ejs.renderFile(path.join(__dirname, '../templates/gallery-template.ejs'), {
        api: config.bangumi_gallery.api || 'bgm',
        quote: config.bangumi_gallery.quote,
        display_config: config.bangumi_gallery.display,
        hitokoto: config.bangumi_gallery.hitokoto,
        planToWatch,
        completed,
        watching,
        __,
        root
    }, {async: false});

    const customPath = config.bangumi_gallery.path;
    return {
        path: customPath || ('/bangumi.html'),
        data: {
            title: config.bangumi_gallery.title,
            content: contents,
            date: lastUpdate
        },
        layout: ['page', 'post']
    };
};