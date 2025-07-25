/* global hexo */
'use strict'

const fs = require('hexo-fs')
const path = require('path')
const bgm = require('./api/get-bgm-data')
const getMalData = require('./api/get-mal-data')
const logger = require('./utils/logger')
const configProvider = require("hexo-bangumi-gallery/utils/config-provider");

const options = {
    options: [
        { name: '-u, --update', desc: 'Update bangumi data' }
    ]
}

hexo.extend.generator.register('bangumi-gallery', function (locals) {
    if (!this.config.bangumi_gallery) {
        logger.warn('Config not found!')
        return
    } else if (!this.config.bangumi_gallery.enable) return

    if (!fs.existsSync(path.join(this.source_dir, '/bangumi-gallery/img/loading.gif'))) {
        fs.copyFile(path.join(__dirname, 'img/loading.gif'), path.join(this.source_dir, '/bangumi-gallery/img/loading.gif'))
    }

    if (!fs.existsSync(path.join(this.source_dir, '/_data/bangumi-gallery/bangumi.json'))) {
        logger.warn('Bangumi info not found!')

        if (!this.config.bangumi_gallery.user_id || this.config.bangumi_gallery.user_id === '') {
            logger.warn('User id not found!')
            return
        }

        const allDisplayConfig = configProvider.allDisplayConfig(this.config.bangumi_gallery)

        if (this.config.bangumi_gallery.api === 'bgm') {
            if (allDisplayConfig.book.enable) bgm.getBgmData(this.config.bangumi_gallery.user_id, 1, this)
            if (allDisplayConfig.bangumi.enable) bgm.getBgmData(this.config.bangumi_gallery.user_id, 2, this)
            if (allDisplayConfig.music.enable) bgm.getBgmData(this.config.bangumi_gallery.user_id, 3, this)
            if (allDisplayConfig.game.enable) bgm.getBgmData(this.config.bangumi_gallery.user_id, 4, this)
        } else if (this.config.bangumi_gallery.api === 'mal') {
            if (!this.config.bangumi_gallery.api_key) {
                logger.warn('API key not found')
                return
            }
            if (allDisplayConfig.book.enable) getMalData(this.config.bangumi_gallery.user_id, this.config.bangumi_gallery.api_key, 1, this)
            if (allDisplayConfig.bangumi.enable) getMalData(this.config.bangumi_gallery.user_id, this.config.bangumi_gallery.api_key, 2, this)
        } else {
            logger.warn('Unknown API')
        }
    } else {
        logger.info('Bangumi info found')
        let source;
        ({
            source
        } = JSON.parse(fs.readFileSync(path.join(this.source_dir, '/_data/bangumi-gallery/bangumi.json'))))

        if (this.config.bangumi_gallery.api !== source && source) {
            logger.warn('Bangumi source changed,run "hexo bangumi-gallery -u" to update the data')
        }
    }

    return require('./utils/page-generator').call(this, locals)
})

hexo.extend.console.register('bangumi-gallery', 'Get bangumi info', options, function (args) {
    if (args.u) {
        if (!this.config.bangumi_gallery) {
            logger.warn('Config not found!')
            return
        } else if (!this.config.bangumi_gallery.enable) {
            logger.info('Bangumi-gallery is disabled')
            return
        }

        const allDisplayConfig = configProvider.allDisplayConfig(this.config.bangumi_gallery)

        if (this.config.bangumi_gallery.api === 'bgm') {
            if (allDisplayConfig.book.enable) bgm.getBgmData(this.config.bangumi_gallery.user_id, 1, this)
            if (allDisplayConfig.bangumi.enable) bgm.getBgmData(this.config.bangumi_gallery.user_id, 2, this)
            if (allDisplayConfig.music.enable) bgm.getBgmData(this.config.bangumi_gallery.user_id, 3, this)
            if (allDisplayConfig.game.enable) bgm.getBgmData(this.config.bangumi_gallery.user_id, 4, this)
        } else if (this.config.bangumi_gallery.api === 'mal') {
            if (!this.config.bangumi_gallery.api_key) {
                logger.warn('API key not found')
                return
            }
            if (allDisplayConfig.book.enable) getMalData(this.config.bangumi_gallery.user_id, this.config.bangumi_gallery.api_key, 1, this)
            if (allDisplayConfig.bangumi.enable) getMalData(this.config.bangumi_gallery.user_id, this.config.bangumi_gallery.api_key, 2, this)
        } else {
            logger.warn('Unknown API')
        }
    } else {
        logger.warn('Unknown connman. Use "hexo bangumi-gallery -h" to see available commands')
    }
})
