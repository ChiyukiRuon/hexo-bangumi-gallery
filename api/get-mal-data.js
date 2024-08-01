'use strict'

const axios = require('axios')
const logger = require('../utils/logger')
const formatBgmData = require('../utils/data-formatter')

const COLLECTION_TYPE = [1, 2, 3]
const COLLECTION_TYPE_KEY = ['', 'plan_to_watch', 'completed', 'watching']
const BASE_URL = 'https://api.myanimelist.net'
const LIMIT = 100
const USER_AGENT = 'ChiyukiRuon/hexo-bangumi-gallery (https://github.com/mmdjiji/hexo-bangumi-gallery)'

let planToWatch = []
let watching = []
let completed = []

async function getMalData (userId, apiKey, context) {
    logger.info(`Fetching data from myanimelist.net for user ${userId}`)

    if (!userId || userId === '') {
        logger.error('User ID is empty')
        return
    } else if (!apiKey || apiKey === '') {
        logger.error('API Key is empty')
        return
    }

    for (const type of COLLECTION_TYPE) {
        logger.info(`Fetching: ${COLLECTION_TYPE_KEY[type]}`)

        let paging = {}
        let currentPage = 0
        do {
            try {
                const res = await axios.get(`${BASE_URL}/v2/users/${userId}/animelist?status=${COLLECTION_TYPE_KEY[type]}&limit=${LIMIT}&offset=${currentPage * LIMIT}`, {
                    headers: {
                        'User-Agent': USER_AGENT,
                        'Content-Type': 'application/json',
                        'X-MAL-CLIENT-ID': apiKey
                    }
                })

                paging = res.data.paging
                currentPage++

                switch (type) {
                    case 1:
                        planToWatch = planToWatch.concat(res.data.data)
                        break
                    case 2:
                        completed = completed.concat(res.data.data)
                        break
                    case 3:
                        watching = watching.concat(res.data.data)
                        break
                }
            } catch (err) {
                logger.error('Error fetching data from myanimelist.net')
                logger.error(err)
                break
            }
        } while (paging.next)
    }

    formatBgmData({ planToWatch, completed, watching }, 'mal', context)

    logger.info('All data fetched.')
    logger.info(`Total: ${planToWatch.length + completed.length + watching.length}. PlanToWatch: ${planToWatch.length}, completed: ${completed.length}, watching: ${watching.length}`)
}

module.exports = getMalData
