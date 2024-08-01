/**
 * 切换展示的板块
 *
 * @param {Number} index 板块索引 0: 想看 1: 再看 2: 已看
 * @param {String} [style] 自定义的当前板块样式
 * @return void
 * @author ChiyukiRuon
 * */
function tabClick(index, style ) {
    for (let i = 0; i <= 2; i++) {
        document.getElementsByClassName('tab-btn')[i].classList.remove('tab-active')
        document.getElementsByClassName('bangumi-container')[i].classList.add('hide')
    }

    const tab = document.getElementsByClassName('tab-btn')[index];
    const show = document.getElementsByClassName('bangumi-container')[index];
    tab.classList.add('tab-active');
    show.classList.remove('hide');
}