'use strict'

const fs = require('hexo-fs')
const path = require('path')
const logger = require('./logger')

function formatBookData(data, source, config) {
    const plan = []
    const completed = []
    const doing = []

    const extractors = {
        bgm: item => extractBgmBook(item),
        mal: item => extractMalBook(item.node)
    }

    const extractor = extractors[source]
    if (!extractor) {
        logger.error(`Source ${source} not supported!`)
        return
    }

    data.plan.forEach(item => plan.push(extractor(item)))
    data.completed.forEach(item => completed.push(extractor(item)))
    data.doing.forEach(item => doing.push(extractor(item)))

    const filePath = path.join(config.source_dir, '_data', 'bangumi-gallery', 'book.json')
    const jsonData = {
        plan,
        completed,
        doing,
        lastUpdate: new Date().toLocaleString(),
        source
    }

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
        if (err) {
            logger.error('Failed to save book info')
            logger.error(err)
        }
    })
}

function formatBangumiData(data, source, config) {
    const plan = []
    const completed = []
    const doing = []

    const extractors = {
        bgm: item => extractBgmAnime(item),
        mal: item => extractMalAnime(item.node)
    }

    const extractor = extractors[source]
    if (!extractor) {
        logger.error(`Source ${source} not supported!`)
        return
    }

    data.plan.forEach(item => plan.push(extractor(item)))
    data.completed.forEach(item => completed.push(extractor(item)))
    data.doing.forEach(item => doing.push(extractor(item)))

    const filePath = path.join(config.source_dir, '_data', 'bangumi-gallery', 'bangumi.json')
    const jsonData = {
        plan,
        completed,
        doing,
        lastUpdate: new Date().toLocaleString(),
        source
    }

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
        if (err) {
            logger.error('Failed to save bangumi info')
            logger.error(err)
        }
    })
}

function formatMusicData(data, config) {
    const plan = []
    const completed = []
    const doing = []

    data.plan.forEach(item => plan.push(extractBgmMusic(item)))
    data.completed.forEach(item => completed.push(extractBgmMusic(item)))
    data.doing.forEach(item => doing.push(extractBgmMusic(item)))

    const filePath = path.join(config.source_dir, '_data', 'bangumi-gallery', 'music.json')
    const jsonData = {
        plan,
        completed,
        doing,
        lastUpdate: new Date().toISOString()
    }

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
        if (err) {
            logger.error('Failed to save music info')
            logger.error(err)
        }
    })
}

function formatGameData(data, config) {
    const plan = []
    const completed = []
    const doing = []

    data.plan.forEach(item => plan.push(extractBgmGame(item)))
    data.completed.forEach(item => completed.push(extractBgmGame(item)))
    data.doing.forEach(item => doing.push(extractBgmGame(item)))

    const filePath = path.join(config.source_dir, '_data', 'bangumi-gallery', 'game.json')
    const jsonData = {
        plan,
        completed,
        doing,
        lastUpdate: new Date().toISOString()
    }

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
        if (err) {
            logger.error('Failed to save game info')
            logger.error(err)
        }
    })
}

function extractBgmImage(imageUrl) {
    const regex = /\/([^\/]+\/[^\/]+\/[^\/]+\.jpg)$/
    return `/${imageUrl.match(regex) ? imageUrl.match(regex)[1] : ''}` || ''
}

function extractBgmBook (item) {
    const subject = item.subject || {}
    const imageUrl = subject.images.common

    return {
        date: subject.date || '',
        image: extractBgmImage(imageUrl),
        name: subject.name || '',
        name_local: subject.name_cn || '',
        summary: subject.short_summary || '',
        tags: (subject.tags || []).map(tag => tag.name),
        score: subject.score || 0,
        subject_id: subject.id || item.subject_id || 0,
        rank: subject.rank || null,
        eps: subject.eps,
        ep_status: item.ep_status,
        volumes: subject.volumes,
        vol_status: item.vol_status,
    }
}

function extractBgmAnime(item) {
    const imageUrl = item.subject.images.common

    return {
        image: extractBgmImage(imageUrl),
        date: item.subject.date,
        name: item.subject.name,
        name_local: item.subject.name_cn,
        summary: item.subject.short_summary,
        tags: (item.subject.tags || []).map(tag => tag.name),
        score: item.subject.score,
        subject_id: item.subject_id,
        eps: item.subject.eps,
        ep_status: item.ep_status
    }
}

function extractBgmMusic(item) {
    const subject = item.subject || {}
    const imageUrl = subject.images.common

    return {
        date: subject.date || '',
        image: extractBgmImage(imageUrl),
        name: subject.name || '',
        name_local: subject.name_cn || '',
        summary: subject.short_summary || '',
        tags: (subject.tags || []).map(tag => tag.name),
        score: subject.score || 0,
        subject_id: subject.id || item.subject_id || 0,
        rank: subject.rank || null
    }
}

function extractBgmGame(item) {
    const subject = item.subject || {}
    const imageUrl = subject.images.common

    return {
        date: subject.date || '',
        image: extractBgmImage(imageUrl),
        name: subject.name || '',
        name_local: subject.name_cn || '',
        summary: subject.short_summary || '',
        tags: (subject.tags || []).map(tag => tag.name),
        score: subject.score || 0,
        subject_id: subject.id || item.subject_id || 0,
        rank: subject.rank || null
    }
}

function extractMalBook(item) {
    return {
        image: item.main_picture,
        date: '',
        name: '',
        name_local: item.title,
        summary: '',
        score: '',
        subject_id: item.id,
        eps: '',
        ep_status: ''
    }
}

function extractMalAnime(item) {
    return {
        image: item.main_picture,
        date: '',
        name: '',
        name_local: item.title,
        summary: '',
        score: '',
        subject_id: item.id,
        eps: '',
        ep_status: ''
    }
}

module.exports = {
    formatBookData,
    formatBangumiData,
    formatMusicData,
    formatGameData
}
