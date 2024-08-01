'use strict';

const I18N = require('hexo-i18n');
const i18n = new I18N({
    languages: ['zh-CN', 'zh-TW', 'en']
});

i18n.set('zh-CN', {
    planToWatch: '想看',
    completed: '已看',
    watching: '在看',
    prev: '上一页',
    next: '下一页',
    start: '首页',
    end: '尾页',
    noAir: '未放送',
    airing: '放送中',
    airDate: '放送日期',
    noData: '暂无数据',
    progress: '观看进度',
    score: '评分',
    totalEp: '全 %d 话',
    onlyBgmNotice: '详细布局仅支持Bangumi数据'
});

i18n.set('zh-TW', {
    planToWatch: '想看',
    completed: '看过',
    watching: '在看',
    prev: '上一頁',
    next: '下一頁',
    start: '首頁',
    end: '尾頁',
    noAir: '尚未播出',
    airing: '正在播出',
    airDate: '播出日期',
    noData: '暫無數據',
    progress: '觀看進度',
    score: '評分',
    totalEp: '全 %d 話',
    onlyBgmNotice: '詳細佈局僅支援Bangumi數據'
});

i18n.set('en', {
    planToWatch: 'Wish',
    completed: 'Completed',
    watching: 'Watching',
    prev: 'PREV',
    next: 'NEXT',
    start: 'START',
    end: 'END',
    noAir: 'Not Yet Aired',
    airing: 'Airing',
    airDate: 'Air Date',
    noData: 'Unknown',
    progress: 'Progress',
    score: 'Score',
    totalEp: '%d Episodes',
    onlyBgmNotice: 'Full mode only supports Bangumi data'
});

module.exports.i18n = i18n;