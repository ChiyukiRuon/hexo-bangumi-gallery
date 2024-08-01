/* global hexo */
'use strict';

const fs = require('hexo-fs');
const path = require('path');
const getBgmData = require("hexo-bangumi-gallery/api/get-bgm-data");
const getMalData = require("hexo-bangumi-gallery/api/get-mal-data");
const logger = require("./utils/logger");

const options = {
    options: [
        { name: '-u, --update', desc: 'Update bangumi data'}
    ]
}

hexo.extend.generator.register('bangumi-gallery', function (locals) {
    if (!this.config.bangumi_gallery) {
        logger.warn('Config not found!');
        return;
    }else if (!this.config.bangumi_gallery.enable) return;

    if (!fs.existsSync(path.join(this.source_dir, '/bangumi-gallery/img/loading.gif'))) {
        fs.copyFile(path.join(__dirname, 'img/loading.gif'), path.join(this.source_dir, '/bangumi-gallery/img/loading.gif'));
    }

    if (!fs.existsSync(path.join(this.source_dir, '/_data/bangumi-gallery/bangumi.json'))) {
        logger.warn('Bangumi info not found!');
        
        if (!this.config.bangumi_gallery.user_id || this.config.bangumi_gallery.user_id === '') {
            logger.warn('User id not found!');
            return;
        }

        if (this.config.api === 'bgm') {
            getBgmData(this.config.bangumi_gallery.user_id, this);
        } else if (this.config.api === 'mal') {
            if (!this.config.bangumi_gallery.api_key) {
                logger.warn('API key not found');
                return;
            }
            getMalData(this.config.bangumi_gallery.user_id, this.config.bangumi_gallery.api_key, this);
        }
    } else {
        logger.info('Bangumi info found');
        let source;
        ({
            source
        } = JSON.parse(fs.readFileSync(path.join(this.source_dir, '/_data/bangumi-gallery/bangumi.json'))));
        
        if (this.config.bangumi_gallery.api !== source && source) {
            logger.warn('Bangumi source changed,run "hexo bangumi-gallery -u" to update the data');
        }
    }

    return require('./utils/page-generator').call(this, locals);
})

hexo.extend.console.register('bangumi-gallery', 'Get bangumi info', options, function (args) {
    if (args.u) {
        if (!this.config.bangumi_gallery) {
            logger.warn('Config not found!');
            return;
        } else if (!this.config.bangumi_gallery.enable) {
            logger.info('Bangumi-gallery is disabled');
            return;
        }
        
        if (this.config.bangumi_gallery.api === 'bgm') {
            getBgmData(this.config.bangumi_gallery.user_id, this);
        } else if (this.config.bangumi_gallery.api === 'mal') {
            if (!this.config.bangumi_gallery.api_key) {
                logger.warn('API key not found');
                return;
            }
            getMalData(this.config.bangumi_gallery.user_id, this.config.bangumi_gallery.api_key, this);
        }
        
    } else {
        logger.warn('Unknown connman. Use "hexo bangumi-gallery -h" to see available commands')
    }
})