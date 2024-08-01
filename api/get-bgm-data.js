'use strict';

const axios = require('axios');
const logger = require("../utils/logger");
const formatBgmData = require('../utils/data-formatter');

const SUBJECT_TYPE = 2
const COLLECTION_TYPE = [1, 2, 3]
const COLLECTION_TYPE_KEY = ['', 'planToWatch', 'completed', 'watching']
const BASE_URL = 'https://api.bgm.tv';
const LIMIT = 100;
const USER_AGENT = 'ChiyukiRuon/hexo-bangumi-gallery (https://github.com/ChiyukiRuon/hexo-bangumi-gallery)';

let planToWatch = [];   // COLLECTION_TYPE = 1
let completed = [];     // COLLECTION_TYPE = 2
let watching = [];      // COLLECTION_TYPE = 3

/**
 * 获取bgm.tv番剧数据
 * 
 * @param {string} userId 用户id
 * @returns void
 * @author ChiyukiRuon
 * */
async function getBgmData(userId, context) {
    logger.info(`Fetching data from bgm.tv for user ${userId}`);

    if (!userId || userId === '') {
        logger.error('User ID is empty');
        return;
    }
    
    for (let type of COLLECTION_TYPE) {
        logger.info(`Fetching: ${COLLECTION_TYPE_KEY[type]}`)
        
        let totalPage = 0;
        let currentPage = 0;
        do {
            try {
                const res = await axios.get(`${BASE_URL}/v0/users/${userId}/collections?subject_type=${SUBJECT_TYPE}&type=${type}&limit=${LIMIT}&offset=${currentPage * LIMIT}`, {
                    headers: {
                        'User-Agent': USER_AGENT,
                        'Content-Type': 'application/json'
                    }
                });

                if (totalPage === 0) totalPage = Math.ceil(res.data.total / LIMIT);

                switch (type) {
                    case 1:
                        planToWatch = planToWatch.concat(res.data.data);
                        break;
                    case 2:
                        completed = completed.concat(res.data.data);
                        break;
                    case 3:
                        watching = watching.concat(res.data.data);
                        break;
                }

                currentPage++;
            } catch (err) {
                logger.error('Error fetching data from bgm.tv');
                logger.error(err);
                break;
            }
        } while (currentPage < totalPage);
    }
    
    formatBgmData({planToWatch: planToWatch, completed: completed, watching: watching}, 'bgm', context);

    logger.info(`All data fetched successfully.`);
    logger.info(`Total: ${planToWatch.length + completed.length + watching.length}. PlanToWatch: ${planToWatch.length}, completed: ${completed.length}, watching: ${watching.length}`);
}

module.exports = getBgmData;