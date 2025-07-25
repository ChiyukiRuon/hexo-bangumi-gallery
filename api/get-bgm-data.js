'use strict'

const packageInfo = require('../package.json')
const axios = require('axios')
const logger = require('../utils/logger')
const formatter = require('../utils/data-formatter')

const SUBJECT_TYPE_KEY = ['', 'book', 'bangumi', 'music', 'game']
const COLLECTION_TYPE = [1, 2, 3]
const COLLECTION_TYPE_KEY = ['', 'plan', 'completed', 'doing']
const BASE_URL = 'https://api.bgm.tv'
const LIMIT = 100
const USER_AGENT = `ChiyukiRuon/hexo-bangumi-gallery/${packageInfo.version} (Web) (https://github.com/ChiyukiRuon/hexo-bangumi-gallery)`

/**
 * 获取 bgm.tv 数据
 *
 * @param {string} userId 用户 ID
 * @param {1|2|3|4} subjectType 条目类型
 * @param {Object} config Hexo 配置
 * @return void
 * @author ChiyukiRuon
 * */
async function getBgmData (userId, subjectType, config) {
    logger.info(`Fetching ${SUBJECT_TYPE_KEY[subjectType]} info from bgm.tv for user ${userId}`)

    let plan = [] // COLLECTION_TYPE = 1
    let completed = [] // COLLECTION_TYPE = 2
    let doing = [] // COLLECTION_TYPE = 3

    if (!userId || userId === '') {
        logger.error('User ID is empty')
        return
    }

    if (subjectType < 1 || subjectType > 4) {
        logger.error('Subject Type is invalid')
        return
    }

    for (const type of COLLECTION_TYPE) {
        logger.info(`Fetching ${SUBJECT_TYPE_KEY[subjectType]}: ${COLLECTION_TYPE_KEY[type]}`)

        let totalPage = 0
        let currentPage = 0
        do {
            try {
                const res = await axios.get(`${BASE_URL}/v0/users/${userId}/collections?subject_type=${subjectType}&type=${type}&limit=${LIMIT}&offset=${currentPage * LIMIT}`, {
                    headers: {
                        'User-Agent': USER_AGENT,
                        'Content-Type': 'application/json'
                    }
                })

                if (totalPage === 0) totalPage = Math.ceil(res.data.total / LIMIT)

                switch (type) {
                    case 1:
                        plan = plan.concat(res.data.data)
                        break
                    case 2:
                        completed = completed.concat(res.data.data)
                        break
                    case 3:
                        doing = doing.concat(res.data.data)
                        break
                }

                currentPage++
            } catch (err) {
                logger.error(`Error fetching ${SUBJECT_TYPE_KEY[subjectType]} info from bgm.tv`)
                logger.error(err)
                break
            }
        } while (currentPage < totalPage)
    }

    switch (subjectType) {
        case 1:
            formatter.formatBookData({ plan, completed, doing}, 'bgm', config)
            break
        case 2:
            formatter.formatBangumiData({ plan, completed, doing }, 'bgm', config)
            break
        case 3:
            formatter.formatMusicData({ plan, completed, doing }, config)
            break
        case 4:
            formatter.formatGameData({ plan, completed, doing }, config)
            break
        default:
            logger.error('Invalid bangumi type')
            break
    }

    logger.info(`Fetch ${SUBJECT_TYPE_KEY[subjectType]} info successfully.`)
    logger.info(`Total(${SUBJECT_TYPE_KEY[subjectType]}): ${plan.length + completed.length + doing.length}. Plan: ${plan.length}, completed: ${completed.length}, doing: ${doing.length}`)
}

module.exports = {
    getBgmData
}
