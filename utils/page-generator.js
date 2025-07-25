'use strict'

const ejs = require('ejs')
const path = require('path')
const { i18n } = require('./i18n')
const fs = require('hexo-fs')
const logger = require('./logger')
const configProvider = require('./config-provider')

module.exports = async function (locals) {
    const { config } = this
    if (!config?.bangumi_gallery?.enable) return

    const root = config.root.endsWith('/') ? config.root.slice(0, -1) : config.root
    const dataPathPrefix = path.join(this.source_dir, '/_data/bangumi-gallery')
    const __ = i18n.__(config.language)
    const api = config.bangumi_gallery.api || 'bgm'
    const totalEnable = configProvider.allDisplayConfig(config.bangumi_gallery).totalEnable

    let plan = []
    let doing = []
    let completed = []
    let lastUpdate = 'Unknown'
    let displayConfig
    let pages = []

    // Book 页面
    displayConfig = configProvider.pageDisplay(config.bangumi_gallery, 'book')
    if (displayConfig.enable) {
        if (config.bangumi_gallery.api === 'mal' && displayConfig.size === 'full') {
            logger.warn('Full mode is NOT supported with MAL API in book page')
        }
        ({plan, doing, completed, lastUpdate} = getPageData(dataPathPrefix, 'book'))
        const bangumiPage = await ejs.renderFile(
            path.join(__dirname, '../templates/book-template.ejs'),
            { api, display_config: displayConfig, plan, completed, doing, __, root, total_enable: totalEnable },
            { async: false }
        )

        pages.push({
            path: displayConfig.path || '/book.html',
            data: {
                title: displayConfig.title || 'My List',
                content: bangumiPage,
                date: lastUpdate
            },
            layout: ['page', 'post']
        })
    }

    // Bangumi 页面
    displayConfig = configProvider.pageDisplay(config.bangumi_gallery, 'bangumi')
    if (displayConfig.enable) {
        if (config.bangumi_gallery.api === 'mal' && displayConfig.size === 'full') {
            logger.warn('Full mode is NOT supported with MAL API in bangumi page')
        }
        ({plan, doing, completed, lastUpdate} = getPageData(dataPathPrefix, 'bangumi'))
        const bangumiPage = await ejs.renderFile(
            path.join(__dirname, '../templates/bangumi-template.ejs'),
            { api, display_config: displayConfig, plan, completed, doing, __, root, total_enable: totalEnable },
            { async: false }
        )

        pages.push({
            path: displayConfig.path || '/bangumi.html',
            data: {
                title: displayConfig.title || 'My List',
                content: bangumiPage,
                date: lastUpdate
            },
            layout: ['page', 'post']
        })
    }

    // Music 页面
    displayConfig = configProvider.pageDisplay(config.bangumi_gallery, 'music')
    if (displayConfig.enable && config.bangumi_gallery.api === 'bgm') {
        ({plan, doing, completed, lastUpdate} = getPageData(dataPathPrefix, 'music'))
        const bangumiPage = await ejs.renderFile(
            path.join(__dirname, '../templates/music-template.ejs'),
            { api, display_config: displayConfig, plan, completed, doing, __, root, total_enable: totalEnable },
            { async: false }
        )

        pages.push({
            path: displayConfig.path || '/music.html',
            data: {
                title: displayConfig.title || 'My List',
                content: bangumiPage,
                date: lastUpdate
            },
            layout: ['page', 'post']
        })
    }

    // Game 页面
    displayConfig = configProvider.pageDisplay(config.bangumi_gallery, 'game')
    if (displayConfig.enable && config.bangumi_gallery.api === 'bgm') {
        ({plan, doing, completed, lastUpdate} = getPageData(dataPathPrefix, 'game'))
        const bangumiPage = await ejs.renderFile(
            path.join(__dirname, '../templates/game-template.ejs'),
            { api, display_config: displayConfig, plan, completed, doing, __, root, total_enable: totalEnable },
            { async: false }
        )

        pages.push({
            path: displayConfig.path || '/game.html',
            data: {
                title: displayConfig.title || 'My List',
                content: bangumiPage,
                date: lastUpdate
            },
            layout: ['page', 'post']
        })
    }

    return pages
}

/**
 * 获取页面数据
 *
 * @param {string} pathPrefix 路径前缀
 * @param {'book'|'bangumi'|'music'|'game'} type 页面类型
 * @return {Object} 页面数据
 * @author ChiyukiRuon
 * */
function getPageData(pathPrefix, type) {
    const dataPath = path.join(pathPrefix, `/${type}.json`)
    let data = {}

    if (fs.existsSync(dataPath)) {
        data = JSON.parse(fs.readFileSync(dataPath))
        logger.info(`${data.plan.length + data.doing.length + data.completed.length} ${type} info loaded`)
        logger.info(`Last update: ${data.lastUpdate}`)
    } else {
        logger.warn('info not found!')
    }

    return data
}

