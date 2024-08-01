'use strict';

const fs = require('hexo-fs');
const path = require('path');
const logger = require("./logger");

let planToWatch = [];   // type = 1
let completed = [];     // type = 2
let watching = [];      // type = 3

/**
 * 处理番剧数据
 *
 * @param {Object} data 番剧数据
 * @param {String} source 番剧数据源，可选值：bgm, mal
 * @return void
 * @author ChiyukiRuon
 * */
function formatBgmData(data, source, context) {
    const filePath = path.join(context.source_dir, '/_data/bangumi-gallery');

    switch (source) {
        case 'bgm':
            data.planToWatch.forEach(item => {
                planToWatch.push(extractBgmItem(item));
            })

            data.completed.forEach(item => {
                completed.push(extractBgmItem(item));
            })

            data.watching.forEach(item => {
                watching.push(extractBgmItem(item));
            })

            fs.writeFile(path.join(filePath, 'bangumi.json'), JSON.stringify({
                planToWatch: planToWatch,
                completed: completed,
                watching: watching,
                lastUpdate: new Date().toLocaleString(),
                source: source
            }), (err) => {
                if (err) {
                    logger.error('Failed to save bangumi info');
                    logger.error(err);
                }
            })
            break;
        case 'mal':
            data.planToWatch.forEach(item => {
                planToWatch.push(extractMalItem(item.node))
            })

            data.completed.forEach(item => {
                completed.push(extractMalItem(item.node))
            })

            data.watching.forEach(item => {
                watching.push(extractMalItem(item.node))
            })

            fs.writeFile(path.join(filePath, 'bangumi.json'), JSON.stringify({
                planToWatch: planToWatch,
                completed: completed,
                watching: watching,
                lastUpdate: new Date().toLocaleString(),
                source: source
            }), (err) => {
                if (err) {
                    logger.error('Failed to save bangumi info');
                    logger.error(err);
                }
            })
            break;
        default:
            logger.error(`source ${source} not supported!`);
            return;
    }
}

function extractBgmItem(item) {
    const regex = /\/([^\/]+\/[^\/]+\/[^\/]+\.jpg)$/;
    const imageUrl = item.subject.images.common;
    const imageName = `/${imageUrl.match(regex) ? imageUrl.match(regex)[1] : ''}`;

    return {
        image: imageName,
        date: item.subject.date,
        name: item.subject.name,
        name_local: item.subject.name_cn,
        summary: item.subject.short_summary,
        score: item.subject.score,
        subject_id: item.subject_id,
        eps: item.subject.eps,
        ep_status: item.ep_status
    }
}

function extractMalItem(item) {
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

module.exports = formatBgmData;