'use strict'

/**
 * 全部的页面显示配置信息
 *
 * @param {Object} config Bangumi gallery 插件配置
 * @return {Object} 全部页面显示配置
 * @author ChiyukiRuon
 * */
function allDisplayConfig(config) {
    const types = ['bangumi', 'book', 'music', 'game']

    const result = {}
    let totalEnable = 0

    for (const type of types) {
        const merged = pageDisplay(config, type)
        result[type] = merged
        if (merged.enable) totalEnable++
    }

    result.totalEnable = totalEnable
    return result
}

/**
 * 页面显示配置
 *
 * @param {Object} config Bangumi gallery 插件配置
 * @param {'book'|'bangumi'|'music'|'game'} page 页面名称
 * @return {Object} 页面显示配置
 * @author ChiyukiRuon
 * */
function pageDisplay(config, page) {
    const baseDisplay = config.display || {}
    const pageConfig = config[page]

    if (!pageConfig || pageConfig.enable !== true) {
        return { enable: false }
    }

    const {
        enable,
        path,
        title,
        quote,
        ...displayOverride
    } = pageConfig

    return {
        enable: true,
        ...baseDisplay,
        ...displayOverride,
        ...(path && { path }),
        ...(title && { title }),
        ...(quote && { quote })
    }
}

module.exports = {
    allDisplayConfig,
    pageDisplay
}
