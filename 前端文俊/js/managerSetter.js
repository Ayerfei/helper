function Sort(name,time) {
    this.name = name;
    this.time = time;
    this['childSort'] = new HashMap();
    this['childCourse'] = new HashMap();
}

function Course(name,up,down,read,time,text) {
    this.name = name;
    this.up = up;
    this.down = down;
    this.read = read;
    this.time = time;
    this.text = text || '';
}

function back() {
    let length = $('.wrapper .main-wrapper .operation-box .index  .breadcrumb').children().length;
    if (length !== 1){
        console.log('回退到:' + (length - 2));
        indexSwitch(length - 2,$('.wrapper .main-wrapper .operation-box .index  .breadcrumb .active').text());
    }
}

/**
 * 存储所有的分类数据
 * @constructor
 */
function SortDataOperator(){
    let data = new HashMap();
    this.addProductSort = function (name, time) {
        function ProductSort(name,time) {
            this['name'] = name;
            this['time'] = time;
            this['childSort'] = new HashMap();
            this['childCourse'] = new HashMap();
        }
        data.put(name,new ProductSort(name,time));
    };
    this.addSort = function (pathArr,name,time) {
        try {
            let target = data;
            for (let i = 0; i < pathArr.length; i++) {
                target = target.get(pathArr[i])['childSort'];
            }
            target.put(name,new Sort(name,time));
        }catch (e) {
            console.log(e);
        }
    };
    this.addCourse = function (pathArr,name,up,down,read,time,value) {
        let target = data;
        for (let i = 0; i < pathArr.length; i++) {
            if (i === (pathArr.length -1)){
                target = target.get([pathArr[i]])['childCourse'];
            } else {
                target = target.get([pathArr[i]])['childSort'];
            }
        }
        target.put(name,new Course(name,up,down,read,time,value));
    };
    this.remove = function (pathArr,name) {
        console.log(pathArr,name);
        let target = data;
        console.log(target);
        console.log(target.get([pathArr[0]]));
        if (!pathArr || !pathArr.length){
            target.remove(name);
            target.remove(name);
            console.log('zero');
            return;
        }
        for (let i = 0; i < pathArr.length; i++) {
            if (i === (pathArr.length -1)){
                target.get([pathArr[i]])['childCourse'].remove(name);
                target.get([pathArr[i]])['childSort'].remove(name);
            } else {
                target = target.get([pathArr[i]])['childSort'];
            }
        }
    };
    this.getSort = function (pathArr) {
        if (pathArr === undefined){
            let sortArr = [];
            let sort = data.getMapObj();
            for (let pron in sort)
            {
                if (sort.hasOwnProperty(pron)){
                    sortArr.push(sort[pron]);
                }
            }
            return sortArr;
        }
        let target = data;
        for (let i = 0; i < pathArr.length; i++) {
            if (i === 0){
                target = target.get(pathArr[i]);
            } else {
                target = target['childSort'].get(pathArr[i]);
            }
        }
        let sortArr = [];
        let courseArr = [];
        try {
            let sort  = target['childSort'].getMapObj();
            let course = target['childCourse'].getMapObj();
            for(let pron in sort){
                if (sort.hasOwnProperty(pron)){
                    sortArr.push(sort[pron]);
                }
            }
            for(let pron in course){
                if (course.hasOwnProperty(pron)){
                    courseArr.push(course[pron]);
                }
            }
        }catch (e) {
            console.log(target);
        }


        return {
            sort : sortArr,
            course : courseArr,
            path : pathArr.join('->'),
        };
    };
    this.getData = function () {
        return data;
    };
    this.getCurrentIndex = function () {
        let box = $('.wrapper .main-wrapper .operation-box .index  .breadcrumb');
        let a = $('.wrapper .main-wrapper .operation-box .index  .breadcrumb li a');
        let active = box.children('li.active');
        let arr = [];
        if (a.length === 0){
            return [];
        }
        for (let i = 1; i < a.length; i++) {
            arr.push(a.eq(i).text());

        }
        arr.push(active.text());
        return arr;
    };
    this.findCourse = function (name,pathArr) {
        let data = this.getSort(pathArr || this.getCurrentIndex());
        let courses = data.course;
        for (let i = 0; i < courses.length; i++) {
            if (name === courses[i].name){
                return courses[i];
            }
        }
        return null;
    };


}

let operator = new SortDataOperator();
operator.addProductSort('API studio','2019-07-17 19:42:31',[]);
operator.addProductSort('API Beacon','2019-07-17 19:42:31',[]);
operator.addProductSort('API Gateway','2019-07-17 19:42:31',[]);
operator.addProductSort('Database Builder','2019-07-17 19:42:31',[]);

operator.addSort(['API studio'],'导入项目','2019-07-17 19:42:31');
operator.addSort(['API studio'],'新建项目','2019-07-17 19:42:31');
operator.addSort(['API studio'],'管理项目','2019-07-17 19:42:31');

operator.addCourse(['API studio'],'教程1','1','2','3','2019-07-17 19:42:31');
operator.addCourse(['API studio'],'教程2','1','2','3','2019-07-17 19:42:31');
operator.addCourse(['API studio'],'教程3','1','2','3','2019-07-17 19:42:31');

operator.addCourse(['API studio','导入项目'],'教程1','1','2','3','2019-07-17 19:42:31');
operator.addCourse(['API studio','导入项目'],'教程2','1','2','3','2019-07-17 19:42:31');
operator.addCourse(['API studio','导入项目'],'教程3','1','2','3','2019-07-17 19:42:31');

operator.addSort(['API studio','导入项目'],'二级分类1','2019-07-17 19:42:31');
operator.addSort(['API studio','导入项目'],'二级分类2','2019-07-17 19:42:31');
operator.addSort(['API studio','导入项目'],'二级分类3','2019-07-17 19:42:31');

operator.addSort(['API studio','导入项目','二级分类1'],'三级分类1','2019-07-17 19:42:31');
operator.addSort(['API studio','导入项目','二级分类1'],'三级分类2','2019-07-17 19:42:31');
operator.addSort(['API studio','导入项目','二级分类1'],'三级分类3','2019-07-17 19:42:31');

operator.addCourse(['API studio','导入项目','二级分类1','三级分类1'],'教程1','1','2','3','2019-07-17 19:42:31');
operator.addCourse(['API studio','导入项目','二级分类1','三级分类1'],'教程2','1','2','3','2019-07-17 19:42:31');
operator.addCourse(['API studio','导入项目','二级分类1','三级分类1'],'教程3','1','2','3','2019-07-17 19:42:31');
// operator.getSort(['API studio'])
// console.log(operator.getSort(['API studio','导入项目']));
// operator.getSort(operator.getCurrentIndex());
// operator.getCurrentIndex();

function showCourseAddBox(flag,course) {
    $('.add-data').remove();
    let box = $(
        ' <div class="add-data">\n' +
        '        <div class="add-course-box">\n' +
        '            <div class="top-title">\n' +
        '                新建教程\n' +
        '                <span class="close">x</span>\n' +
        '            </div>\n' +
        '            <div class="center-content">\n' +
        '                <h3>* 教程名称</h3>\n' +
        '                <input type="text" class="name">\n' +
        '            </div>\n' +
        '<div class="md-box">' +
        '   <div id="area">\n' +
        '        <table>\n' +
        '            <tr>\n' +
        '                <td><textarea name="" id="md-area" onkeyup=mdSwitch(); style="overflow: auto"></textarea></td>\n' +
        '                <td>\n' +
        '                    <div id="show-area" class="clearfix" style="overflow: auto"></div>\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '        </table>\n' +
        '    </div>' +
        '</div>\n' +
        '            <div class="bottom-confirm">\n' +
        '                <button class="yes">确认</button>\n' +
        '                <button class="no">取消</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>');
    let body = $("body");
    body.off('click');
    body.delegate("span.close", "click", function () {
        box.remove();
    });
    body.delegate('.add-data .add-course-box .bottom-confirm .yes','click',function () {
        let name = $('.add-data .add-course-box .name').val();
        let time = getDateStr();
        if (flag){
            $('.table-box tbody').append(createCourseLine(new Course(name,0,0,0,time)));
        }
        operator.addCourse(operator.getCurrentIndex(),name,0,0,0,time,getInputMdValue());
        box.remove();
    });
    body.delegate('.add-data .add-course-box .bottom-confirm .no','click',function () {
        box.remove();
    });
    body.append(box);
    $('.center-content input.name').val((course && course.name) || '');
    setMd((course && course.text) || '');
}

function showZeroAddBox() {
    let box = $(
        ' <div class="add-data">\n' +
        '        <div class="add-product-box">\n' +
        '            <div class="top-title">\n' +
        '                新建产品分类\n' +
        '                <span class="close">x</span>\n' +
        '            </div>\n' +
        '            <div class="center-content">\n' +
        '                <h3>* 产品分类名称</h3>\n' +
        '                <input type="text" class="name">\n' +
        '                <h3>* 产品分类icon</h3>\n' +
        '                <input type="text" class="icon">\n' +
        '                <h3>* 产品分类描述</h3>\n' +
        '                <input type="text" class="description">\n' +
        '            </div>\n' +
        '            <div class="bottom-confirm">\n' +
        '                <button class="yes">确认</button>\n' +
        '                <button class="no">取消</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>');

    let body = $("body");
    body.delegate("span.close", "click", function () {
        box.remove();
    });

    body.delegate('.add-data .add-product-box .bottom-confirm .yes','click',function () {
        let name = $('.add-data .add-product-box .name').val();
        let icon = $('.add-data .add-product-box .icon').val();
        let desc = $('.add-data .add-product-box .description').val();
        addZeroTableCol(name,icon,desc);
        operator.addSort([],name,getDateStr());
        box.remove();
    });

    body.delegate('.add-data .add-product-box .bottom-confirm .no','click',function () {
        box.remove();
    });
    body.append(box);

}

function addCourseCol(course) {
    let tbody = $('.table-box tbody');
    tbody.append(createCourseLine(course));
}


function addTableSortCol(name,time) {
    let tbody = $('.table-box tbody');
    let tr = $('                    <tr class="sort">\n' +
        '                        <td>'+ name +'</td>\n' +
        '                        <td></td>\n' +
        '                        <td></td>\n' +
        '                        <td></td>\n' +
        '                        <td>'+ time +'</td>\n' +
        '                        <td>\n' +
        '                            <a href="#" class="edit">编辑</a>\n' +
        '                            <span>|</span>\n' +
        '                            <a href="#" class="delete">删除</a>\n' +
        '                        </td>\n' +
        '                    </tr>\n');
    tbody.append(tr);
    return tr;
}


function addZeroTableCol(name, time,icon, desc) {
    let tbody = $('.product-zero tbody');
    let tr = $('<tr class="sort">\n' +
        '                            <td>'+ name +'</td>\n' +
        '                            <td>' + time +'</td>\n' +
        '                            <td>\n' +
        '                                <a href="#" class="edit">编辑</a>\n' +
        '                                <span>|</span>\n' +
        '                                <a href="#" class="delete">删除</a>\n' +
        '                            </td>\n' +
        '                        </tr>');
    tbody.append(tr);
    return tr;
}

function addZeroTable() {
    let table =
        $('                    <table class="table table-striped product-zero">\n' +
            '                        <thead>\n' +
            '                        <tr>\n' +
            '                            <th>产品分类</th>\n' +
            '                            <th>最后编辑时间</th>\n' +
            '                            <th>操作</th>\n' +
            '                        </tr>\n' +
            '                        </thead>\n' +
            '                        <tbody>\n' +
            '                        </tbody>\n' +
            '                    </table>');
    let box = $('.wrapper .main-wrapper .table-box');
    let data = operator.getSort();
    box.append(table);
    for (let i = 0; i < data.length; i++) {
        addZeroTableCol(data[i].name,data[i].time);
    }
    box.delegate('.product-zero tr.sort','click',function () {
        indexSwitch.apply($(this),[1,$(this).children('td').eq(0).text()]);
    });
    box.delegate('.course a.edit','click',function (){
        let name = $(this).parent().parent().children().eq(0).text();
        let course = operator.findCourse(name);
        showCourseAddBox(false,course);
    });
    box.delegate('.product-zero a.delete','click',function (event) {
        stopBubble(event);
        operator.remove(operator.getCurrentIndex(),$(this).parent().parent().children().eq(0).text());
        $(this).parent().parent().remove();
    });
    return table;
}


function addFirstTable() {

    let table = $('<table class="table table-striped sort-first">\n' +
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th class="course-name">一级分类名称(教程名称)</th>\n' +
        '                        <th>赞</th>\n' +
        '                        <th>踩</th>\n' +
        '                        <th>阅读量</th>\n' +
        '                        <th>更新时间</th>\n' +
        '                        <th>操作</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                    <tbody>\n' +
        '                    </tbody>\n' +
        '                </table>');

    let box = $('.wrapper .main-wrapper .table-box');
    box.append(table);
    let data = operator.getSort(operator.getCurrentIndex());
    let sort = data.sort;
    for (let i = 0; i < sort.length; i++) {
        addTableSortCol(sort[i].name,sort[i].time);
    }
    let course = data.course;
    for (let i = 0; i < course.length; i++) {
        addCourseCol(course[i]);
    }
    box.delegate('.sort-first tr.sort','click',function () {
        indexSwitch.apply($(this),[2,$(this).children('td').eq(0).text()]);
    });
    box.delegate('.sort-first a.delete','click',function (event) {
        stopBubble(event);
        operator.remove(operator.getCurrentIndex(),$(this).parent().parent().children().eq(0).text());
        $(this).parent().parent().remove();
    });
}

function addSecondTable() {
    let table = $('<table class="table table-striped sort-second">\n' +
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th class="course-name">二级分类名称(教程名称)</th>\n' +
        '                        <th>赞</th>\n' +
        '                        <th>踩</th>\n' +
        '                        <th>阅读量</th>\n' +
        '                        <th>更新时间</th>\n' +
        '                        <th>操作</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                    <tbody>\n' +
        '                    </tbody>\n' +
        '                </table>');

    let box = $('.wrapper .main-wrapper .table-box');
    box.append(table);
    let data = operator.getSort(operator.getCurrentIndex());
    let sort = data.sort;
    for (let i = 0; i < sort.length; i++) {
        addTableSortCol(sort[i].name,sort[i].time);
    }
    let course = data.course;
    for (let i = 0; i < course.length; i++) {
        addCourseCol(course[i]);
    }
    box.delegate('.sort-second tr.sort','click',function () {
        indexSwitch.apply($(this),[3,$(this).children('td').eq(0).text()]);
    });
    box.delegate('.sort-second a.delete','click',function (event) {
        stopBubble(event);
        operator.remove(operator.getCurrentIndex(),$(this).parent().parent().children().eq(0).text());
        $(this).parent().parent().remove();
    });

}

function addThirdTable() {

    let table = $('<table class="table table-striped sort-third">\n' +
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th class="course-name">三级分类名称(教程名称)</th>\n' +
        '                        <th>赞</th>\n' +
        '                        <th>踩</th>\n' +
        '                        <th>阅读量</th>\n' +
        '                        <th>更新时间</th>\n' +
        '                        <th>操作</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                    <tbody>\n' +
        '                    </tbody>\n' +
        '                </table>');

    let box = $('.wrapper .main-wrapper .table-box');
    box.append(table);
    let data = operator.getSort(operator.getCurrentIndex());
    let sort = data.sort;
    for (let i = 0; i < sort.length; i++) {
        addTableSortCol(sort[i].name,sort[i].time);
    }
    let course = data.course;
    for (let i = 0; i < course.length; i++) {
        addCourseCol(course[i]);
    }
    box.delegate('.sort-third tr.sort','click',function (event) {
        stopBubble(event);
        operator.remove(operator.getCurrentIndex(),$(this).parent().parent().children().eq(0).text());
        indexSwitch.apply($(this),[4,$(this).children('td').eq(0).text()]);
    });
    box.delegate('.sort-third a.delete','click',function () {
        $(this).parent().parent().remove();
    });

}


function addFourthTable() {

    let table = $('<table class="table table-striped sort-fourth">\n' +
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th class="course-name">教程名称</th>\n' +
        '                        <th>赞</th>\n' +
        '                        <th>踩</th>\n' +
        '                        <th>阅读量</th>\n' +
        '                        <th>更新时间</th>\n' +
        '                        <th>操作</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                    <tbody>\n'+
        '                    </tbody>\n' +
        '                </table>');

    let box = $('.wrapper .main-wrapper .table-box');
    box.append(table);
    box.delegate('.sort-fourth tr.sort','click',function () {
        indexSwitch.apply($(this),[5]);
    });
    box.delegate('.sort-fourth a.delete','click',function (event) {
        stopBubble(event);
        operator.remove(operator.getCurrentIndex(),$(this).parent().parent().children().eq(0).text());
        $(this).parent().parent().remove();
    });



    let data = operator.getSort(operator.getCurrentIndex());
    let course = data.course;
    for (let i = 0; i < course.length; i++) {
        addCourseCol(course[i]);
    }


}


function setIndexBox(index,text) {


    if (index === ($('.wrapper .main-wrapper .operation-box .index  .breadcrumb').children().length - 2) ){
        let box = $('.wrapper .main-wrapper .operation-box .index  .breadcrumb');
        let last = box.children('li:last-child');
        last.remove();
        last = box.children('li:last-child');
        text = last.children('a').text();
        last.remove();
        box.append('<li class="active">'+ text +'</li>');
        return;
    }

    if (index === 0){
        let box = $('.wrapper .main-wrapper .operation-box .index  .breadcrumb');
        box.empty();
        let zero = $('<li class="active">产品分类</li>');
        box.append(zero);
    }else if (index === 1) {
        let box = $('.wrapper .main-wrapper .operation-box .index  .breadcrumb')
        box.empty();
        let content = $('<li><a  href="#">产品分类</a></li>' +
            '<li class="active">' + text +'</li>');
        box.append(content);
    }else if (index === 2 || index === 3 || index === 4){
        let box = $('.wrapper .main-wrapper .operation-box .index  .breadcrumb');
        let lastChild = box.children('.active');
        if (box.children().length === index){
            let newLastChild =$('<li><a  href="#">'+ lastChild.text() +'</a></li>');
            lastChild.replaceWith(newLastChild);
            lastChild = $('<li class="active">' + text +'</li>');
            box.append(lastChild);
        } else {
            lastChild.text(text);
        }
    }


}

function setButtonBox(index) {
    let box = $('.wrapper .main-wrapper .operation-box .operation');
    let buttons = box.children('button');
    let sortButton = buttons.eq(0);
    let courseButton = buttons.eq(1);
    if (index === 0){
        setHide(courseButton);
        setShow(sortButton);
        sortButton.off('click');
        sortButton.click(function () {
            $('body').off('click');
            showZeroAddBox();
        });
    }else if (index === 1) {
        setShow(courseButton);
        setShow(sortButton);
        sortButton.children('span').text('新建一级分类');
        sortButton.off('click');
        sortButton.click(function () {
            $('body').off('click');
            showFirstAddBox();
        });
    }else if (index === 2){
        setShow(sortButton);
        sortButton.children('span').text('新建二级分类');
        sortButton.off('click');
        sortButton.click(function () {
            $('body').off('click');
            showSecondAddBox();
        });
    }else if (index === 3){
        setShow(sortButton);
        sortButton.children('span').text('新建三级分类');
        sortButton.off('click');
        sortButton.click(function () {
            $('body').off('click');
            showThirdAddBox();
        });
    }else if (index === 4){
        setHide(sortButton);
    }

}

function setShow(dom) {
    dom.css('display','initial');
}

function setHide(dom) {
    dom.css('display','none')
}

/**
 * 切换分类时的样式切换封装
 * @param index 当前分类
 */
function indexSwitch(index,text) {

    setIndexBox(index,text);
    setButtonBox(index);
    $('.wrapper .main-wrapper .table-box').empty();
    console.log(index);
    if (index === 0){
        addZeroTable();
    }else if (index === 1){
        addFirstTable();
    }else if (index === 2) {
        addSecondTable();
    }else if (index === 3){
        addThirdTable();
    }else if (index === 4){
        addFourthTable();
    }

}



function showFirstAddBox() {
    let box = $(
        ' <div class="add-data">\n' +
        '        <div class="add-first-box">\n' +
        '            <div class="top-title">\n' +
        '                新建一级分类\n' +
        '                <span class="close">x</span>\n' +
        '            </div>\n' +
        '            <div class="center-content">\n' +
        '                <h3>* 一级分类名称</h3>\n' +
        '                <input type="text" class="name">\n' +
        '            </div>\n' +
        '            <div class="bottom-confirm">\n' +
        '                <button class="yes">确认</button>\n' +
        '                <button class="no">取消</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>');
    let body = $("body");
    body.delegate("span.close", "click", function () {
        box.remove();
    });
    body.delegate('.add-data .add-first-box .bottom-confirm .yes','click',function () {
        let name = $('.add-data .add-first-box .name').val();
        let time = getDateStr();
        addTableSortCol(name,time);
        operator.addSort(operator.getCurrentIndex(),name,time);
        box.remove();
    });
    body.delegate('.add-data .add-first-box .bottom-confirm .no','click',function () {
        box.remove();
    });
    body.append(box);
}

function showSecondAddBox(){
    let box = $(
        ' <div class="add-data">\n' +
        '        <div class="add-second-box">\n' +
        '            <div class="top-title">\n' +
        '                新建二级分类\n' +
        '                <span class="close">x</span>\n' +
        '            </div>\n' +
        '            <div class="center-content">\n' +
        '                <h3>* 二级分类名称</h3>\n' +
        '                <input type="text" class="name">\n' +
        '            </div>\n' +
        '            <div class="bottom-confirm">\n' +
        '                <button class="yes">确认</button>\n' +
        '                <button class="no">取消</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>');
    let body = $("body");
    body.delegate("span.close", "click", function () {
        box.remove();
    });
    body.delegate('.add-data .add-second-box .bottom-confirm .yes','click',function () {
        let name = $('.add-data .add-second-box .name').val();
        let time = getDateStr();
        addTableSortCol(name,time);
        operator.addSort(operator.getCurrentIndex(),name,time);
        box.remove();
    });
    body.delegate('.add-data .add-second-box .bottom-confirm .no','click',function () {
        box.remove();
    });
    body.append(box);
}

function showThirdAddBox(){
    let box = $(
        ' <div class="add-data">\n' +
        '        <div class="add-third-box">\n' +
        '            <div class="top-title">\n' +
        '                新建三级分类\n' +
        '                <span class="close">x</span>\n' +
        '            </div>\n' +
        '            <div class="center-content">\n' +
        '                <h3>* 三级分类名称</h3>\n' +
        '                <input type="text" class="name">\n' +
        '            </div>\n' +
        '            <div class="bottom-confirm">\n' +
        '                <button class="yes">确认</button>\n' +
        '                <button class="no">取消</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>');
    let body = $("body");
    body.delegate("span.close", "click", function () {
        box.remove();
    });
    body.delegate('.add-data .add-third-box .bottom-confirm .yes','click',function () {
        let name = $('.add-data .add-third-box .name').val();
        let time = getDateStr();
        addTableSortCol(name,time);
        operator.addSort(operator.getCurrentIndex(),name,time);
        box.remove();
    });
    body.delegate('.add-data .add-third-box .bottom-confirm .no','click',function () {
        box.remove();
    });
    body.append(box);
}

function createCourseLine(course) {
    return $('                    <tr class="course">\n' +
        '                        <td>' + course.name + '</td>\n' +
        '                        <td>' + course.up + '</td>\n' +
        '                        <td>' + course.down + '</td>\n' +
        '                        <td>' + course.read + '</td>\n' +
        '                        <td>2019-04-28 15:14:46</td>\n' +
        '                        <td>\n' +
        '                            <a href="#" class="edit">编辑</a>\n' +
        '                            <span>|</span>\n' +
        '                            <a href="#" class="delete">删除</a>\n' +
        '                        </td>\n' +
        '                    </tr>\n');
}

function HashMap(){
    //定义长度
    let length = 0;
    //创建一个对象
    let obj = {};

    /**
     * 判断Map是否为空
     */
    this.isEmpty = function(){
        return length === 0;
    };

    /**
     * 判断对象中是否包含给定Key
     */
    this.containsKey=function(key){
        return (key in obj);
    };

    /**
     * 判断对象中是否包含给定的Value
     */
    this.containsValue=function(value){
        for(let key in obj){
            if(obj[key] === value){
                return true;
            }
        }
        return false;
    };

    /**
     *向map中添加数据
     */
    this.put=function(key,value){
        if(!this.containsKey(key)){
            length++;
        }
        obj[key] = value;
    };

    /**
     * 根据给定的Key获得Value
     */
    this.get = function(key){
        return this.containsKey(key)?obj[key]:null;
    };

    /**
     * 根据给定的Key删除一个值
     */
    this.remove=function(key){
        if(this.containsKey(key)&&(delete obj[key])){
            length--;
        }
    };

    /**
     * 获得Map中的所有Value
     */
    this.values=function(){
        let _values= [];
        for(let key in obj){
            _values.push(obj[key]);
        }
        return _values;
    };

    /**
     * 获得Map中的所有Key
     */
    this.keySet=function(){
        let _keys = [];
        for(let key in obj){
            _keys.push(key);
        }
        return _keys;
    };

    /**
     * 获得Map的长度
     */
    this.size = function(){
        return length;
    };

    /**
     * 清空Map
     */
    this.clear = function(){
        length = 0;
        obj = {};
    };


    this.getMapObj = function () {
        return obj;
    }
}　　

