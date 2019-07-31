/**
 * 加载热门提问
 * @param dataArr
 * @returns {null|*|jQuery}
 */
function createHotSearchDom(dataArr) {

    let ul = $('.hot-question').eq(0);
    if (!dataArr){
        return null;
    }
    console.log('yyy');
    for (let i = 0; i < dataArr.length; i++) {

        let data = dataArr[i];
        let li = $('<li></li>');
        let a = $('<a></a>');
        li.addClass('hot-item');
        a.attr('href',data.link);
        a.text(data.text);
        li.append(a);
        ul.append(li);
    }
    return ul;
}