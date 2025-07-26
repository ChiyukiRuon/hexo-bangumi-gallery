'use strict';

const I18N = require('hexo-i18n');
const i18n = new I18N({
    languages: ['zh-CN', 'zh-TW', 'en']
});

i18n.set('zh-CN', {
    prev: '上一页',
    next: '下一页',
    start: '首页',
    end: '尾页',
    noData: '暂无数据',
    onlyBgmNotice: '详细布局仅支持 Bangumi 数据',
    book: {
        plan: '想读',
        completed: '读过',
        doing: '在读',
        score: '评分',
        date: '发售日期',
        progress: '阅读进度',
        ep: '章节',
        volume: '卷',
        totalEp: '全 %s 话',
        totalVol: '全 %s 卷'
    },
    bangumi: {
        plan: '想看',
        completed: '看过',
        doing: '在看',
        airDate: '放送日期',
        progress: '观看进度',
        score: '评分',
        totalEp: '全 %d 话',
    },
    music: {
        plan: '想听',
        completed: '听过',
        doing: '在听',
        score: '评分',
        rank: '排名',
        date: '发行日期'
    },
    game: {
        plan: '想玩',
        completed: '玩过',
        doing: '在玩',
        rank: '排名',
        score: '评分',
        date: '发行日期'
    }
});

i18n.set('zh-TW', {
    prev: '上一頁',
    next: '下一頁',
    start: '首頁',
    end: '尾頁',
    noData: '暫無資料',
    onlyBgmNotice: '詳細佈局僅支援 Bangumi 資料',
    book: {
        plan: '想讀',
        completed: '讀過',
        doing: '在讀',
        score: '評分',
        date: '發售日期',
        progress: '閱讀進度',
        ep: '章節',
        volume: '卷',
        totalEp: '全 %s 話',
        totalVol: '全 %s 卷'
    },
    bangumi: {
        plan: '想看',
        completed: '看過',
        doing: '在看',
        airDate: '播放日期',
        progress: '觀看進度',
        score: '評分',
        totalEp: '全 %d 話'
    },
    music: {
        plan: '想聽',
        completed: '聽過',
        doing: '在聽',
        score: '評分',
        rank: '排名',
        date: '發行日期'
    },
    game: {
        plan: '想玩',
        completed: '玩過',
        doing: '在玩',
        rank: '排名',
        score: '評分',
        date: '發行日期'
    }
});

i18n.set('en', {
    prev: 'PREV',
    next: 'NEXT',
    start: 'START',
    end: 'END',
    noData: 'Unknown',
    onlyBgmNotice: 'Full mode is only available for Bangumi data',
    book: {
        plan: 'Wish',
        completed: 'Completed',
        doing: 'Reading',
        score: 'Score',
        date: 'Release Date',
        progress: 'Progress',
        ep: 'Chapter',
        volume: 'Volume',
        totalEp: '%s Chapters Total',
        totalVol: '%s Volumes Total'
    },
    bangumi: {
        plan: 'Wish',
        completed: 'Completed',
        doing: 'Watching',
        airDate: 'Air Date',
        progress: 'Progress',
        score: 'Score',
        totalEp: '%d Episodes Total'
    },
    music: {
        plan: 'Wish',
        completed: 'Completed',
        doing: 'Listening',
        score: 'Score',
        rank: 'Rank',
        date: 'Release Date'
    },
    game: {
        plan: 'Want to Play',
        completed: 'Played',
        doing: 'Playing',
        rank: 'Rank',
        score: 'Score',
        date: 'Release Date'
    }
});

module.exports.i18n = i18n;
