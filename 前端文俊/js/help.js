/**
 * 存储所有的分类数据
 * @constructor
 */
function SortDataOperator(){
    let data = new HashMap();
    this.addProductSort = function (name, time) {
        data.put(name,new Sort(name,time));
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

    this.turnToArray = function () {

        function turnSort(sort){
            // sort = deepClone(sort,{});
            let obj = {
                name : sort.name,
                time : sort.time,
                sort : deepClone(sort.childSort.getMapObj()),
                course : deepClone(sort.childCourse.getMapObj()),
            };
            for (let pron in obj.sort){
                if (obj.sort.hasOwnProperty(pron)){
                    if (obj.sort[pron] instanceof Sort){
                        obj.sort[pron] = turnSort(obj.sort[pron]);
                        obj.sort[pron].__proto__ = Sort.prototype;
                    }else {
                    }
                }
            }
            obj.sort.__proto__ = Sort.prototype;
            return obj;
        }

        function swap(obj){
            for (let pron in obj) {
                if (obj.hasOwnProperty(pron)) {
                    if (obj[pron] instanceof Sort) {
                        obj[pron] = turnSort(obj[pron]);
                        obj[pron].__proto__ = Sort.prototype;
                    }

                }
            }
        }

        let data = this.getData().getMapObj();
        let newData = {};
        deepClone(data,newData);
        swap(newData);
        return newData;
    }


}



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

let operator = new SortDataOperator();
operator.addProductSort('API studio','2019-07-17 19:42:31',[]);
operator.addProductSort('API Beacon','2019-07-17 19:42:31',[]);
operator.addProductSort('API Gateway','2019-07-17 19:42:31',[]);
operator.addProductSort('Database Builder','2019-07-17 19:42:31',[]);

operator.addCourse([],'教程1','1','2','3','2019-07-17 19:42:31')
operator.addCourse([],'教程2','1','2','3','2019-07-17 19:42:31')
operator.addCourse([],'教程3','1','2','3','2019-07-17 19:42:31')


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


console.log(operator.turnToArray());
// console.log(operator.getData().getMapObj()['API studio'].childSort.getMapObj());
// let data = operator.turnToArray();

function setMenu() {
    $('.content').delegate('.sort h3','click',function () {
        let ul = $(this).parent().children('ul');
        if (ul.children().length){
            ul.slideToggle(300)
        }
        $(this).parent().toggleClass('open');
        $(this).parent().toggleClass('close');
    });
}

function createMenu() {

    let data = operator.turnToArray();
    let content = $('<ul class="content"></ul>');
    for(let pron in data){
        if (data.hasOwnProperty(pron)){
            if (data[pron] instanceof Sort){
                let li = $('<li class="sort close"></li>');
                content.append(li);
                setSortDom(li,data[pron]);
            }
            else if (data[pron] instanceof Course){
                let li = $('<li class="course"></li>');
                content.append(li);
                setCourseDom(li,data[pron]);
            }
        }
    }
    $('.box').append(content);
    function setSortDom(parent, data) {
        let h3 = $('<h3>'+ data.name +'</h3>');
        let ul = $('<ul></ul>');
        let sort = data.sort;
        let course = data.course;
        for (let pron in sort){
            if (sort.hasOwnProperty(pron)){
                let li = $('<li class="sort close"></li>')
                setSortDom(li,sort[pron]);
                ul.append(li);
            }
        }
        for (let pron in course){
            if (course.hasOwnProperty(pron)){
                let li = $('<li class="course"></li>');
                let h3 = $('<h3>'+ course[pron].name +'</h3>');
                li.append(h3);
                ul.append(li);
            }
        }
        parent.append(h3,ul);
    }
    function setCourseDom(parent,data){

        let h3 = $('<h3>'+ data.name +'</h3>');
        parent.append(h3);

    }
}


function createHotCourseDom(dataArr) {

    let ul = $('.hot-course');
    for (let i = 0; i < dataArr.length; i++) {
        ul.append($('<li>'+ dataArr[i] +'</li>'));
    }


}

function createHotQuestionDom(dataArr) {

    let ul = $('.hot-question');
    for (let i = 0; i < dataArr.length; i++) {
        ul.append($('<li>'+ dataArr[i] +'</li>'));
    }
}


function createHotDom(hotCourseArr, hotQuestionArr) {

    let box = $(
        '       <div class="course-wrapper">\n' +
        '            <h2>热门教程</h2>\n' +
        '            <ul class="hot-course clear"></ul>\n' +
        '        </div>\n' +
        '        <div class="question-wrapper">\n' +
        '            <h2>常见提问</h2>\n' +
        '            <ul class="hot-question clear"></ul>\n' +
        '        </div>' +
        '');
    let wrapper = $('.main-wrapper');
    wrapper.empty();
    wrapper.append(box);
    createHotCourseDom(hotCourseArr);
    createHotQuestionDom(hotQuestionArr);
}



