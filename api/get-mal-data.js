'use strict';

const axios = require('axios');
const logger = require("../utils/logger");
const formatter = require('../utils/data-formatter')

const SUBJECT_TYPE_KEY = ['', 'mangalist', 'animelist']
const COLLECTION_TYPE = [1, 2, 3]
const COLLECTION_TYPE_KEY = [[], ['', 'plan_to_read', 'completed', 'reading'], ['', 'plan_to_watch', 'completed', 'watching']]
const BASE_URL = 'https://api.myanimelist.net/v2';
const LIMIT = 100;
const USER_AGENT = 'ChiyukiRuon/hexo-bangumi-gallery (https://github.com/mmdjiji/hexo-bangumi-gallery)';

/**
 * 获取 MyAnimeList 数据
 *
 * @param {string} userId 用户 ID
 * @param {number} apiKey MyAnimeList API Key
 * @param {1|2} subjectType 条目类型
 * @param {Object} config Hexo 配置
 * @return void
 * @author ChiyukiRuon
 * */
async function getMalData(userId, apiKey, subjectType, config) {
    logger.info(`Fetching ${SUBJECT_TYPE_KEY[subjectType]} from myanimelist.net for user ${userId}`);

    let plan = [] // COLLECTION_TYPE = 1
    let completed = [] // COLLECTION_TYPE = 2
    let doing = [] // COLLECTION_TYPE = 3

    if (!userId || userId === '') {
        logger.error('User ID is empty');
        return;
    } else if (!apiKey || apiKey === '') {
        logger.error('API Key is empty');
        return;
    }

    for (let type of COLLECTION_TYPE) {
        logger.info(`Fetching ${SUBJECT_TYPE_KEY[subjectType]}: ${COLLECTION_TYPE_KEY[subjectType][type]}`)

        let paging = {}
        let currentPage = 0;
        do {
            try {
                const res = await axios.get(`${BASE_URL}/users/${userId}/${SUBJECT_TYPE_KEY[subjectType]}?status=${COLLECTION_TYPE_KEY[subjectType][type]}&limit=${LIMIT}&offset=${currentPage * LIMIT}`, {
                    headers: {
                        'User-Agent': USER_AGENT,
                        'Content-Type': 'application/json',
                        'X-MAL-CLIENT-ID': apiKey
                    }
                });

                paging = res.data.paging;
                currentPage++;

                switch (type) {
                    case 1:
                        plan = plan.concat(res.data.data);
                        break;
                    case 2:
                        completed = completed.concat(res.data.data);
                        break;
                    case 3:
                        doing = doing.concat(res.data.data);
                        break;
                }

            } catch (err) {
                logger.error(`Error fetching ${SUBJECT_TYPE_KEY[subjectType]} from myanimelist.net`);
                logger.error(err);
                break;
            }
        } while (paging.next);
    }

    switch (subjectType) {
        case 1:
            formatter.formatBookData({ plan, completed, doing}, 'mal', config)
            break
        case 2:
            formatter.formatBangumiData({ plan, completed, doing }, 'mal', config)
            break
        default:
            logger.error('Invalid bangumi type')
            break
    }

    logger.info(`Fetch ${SUBJECT_TYPE_KEY[subjectType]} successfully.`);
    logger.info(`Total(${SUBJECT_TYPE_KEY[subjectType]}): ${plan.length + completed.length + doing.length}. Plan: ${plan.length}, completed: ${completed.length}, doing: ${doing.length}`);
}

module.exports = getMalData;
