//CodeGlance
//emmet

(function init() {
    Element.prototype.insertAfter = insertAfter;
}());


function segmentation() {
    if (arguments[0] !== undefined){
        console.log(arguments[0] + "---------------------------" + arguments[0])
    }
    else {
        console.log("---------------------------");
    }
}

function log() {
    try {
        console.log.apply(this,[].slice.call(arguments,0));
    }catch (e) {
        console.log("log:exception:" + e);
    }
}

function print(anything) {
    try {
        document.write(anything);
    }catch (e) {
        console.log("print:exception:" + e);
    }
}

function type(sth) {
    return Object.prototype.toString.call(sth);
}

function myIsNaN(sth) {
    return typeof sth === "number" ? (Number(sth) + "") === "NaN" : false;
}

function deepClone(origin,target) {

    target = target || {} ;
    for (let prop in origin){
        if (origin.hasOwnProperty(prop)){
            if (typeof(origin[prop]) === 'object'  && origin[prop] !== 'null'){
                target[prop] = (type(origin[prop]) === "[object Array]") ? [] : {};
                deepClone(origin[prop],target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}

/**
 *
 * @param target
 * @param flag 是否判断NaN,默认不判断
 * @returns string
 */

function getType(target,flag) {

    let typeMap = {
        "[object Array]" : "array",
        "[object Object]" : "object",
        "[object Number]" : "number-object",
        "[object Boolean]" : "boolean-object",
        "[object String]" : 'string-object',
        "NaN" : "number-NaN"
    };
    let type = typeof(target);
     if (flag === true && myIsNaN(target)){
        return typeMap.NaN;
    }
    if (target === null){
        return "null";
    }
    else if (type === "function"){
        return "function"
    }
    else if (type === "object"){
        let str = typeMap[Object.prototype.toString.call(target)];
        return str === undefined ? Object.prototype.toString.call(target): str;
    }else {
        return type;
    }
}

/**
 * 数组去重
 * @param target 源数组
 * @returns {Array|*}
 */
function delSameValue(target) {

    let obj = {};
    if (getType(target) === "array"){
        let arr = [];
        let len = target.length;
        for (let i = 0 ; i < len ; i++){
            if (!obj.hasOwnProperty(target[i])){
                obj[target[i]] = "value";
                arr.push(target[i]);
            }
        }
        return arr;
    }else {
        return target;
    }

}


/**
 * 设置一个类继承于另一个类
 * @param target 子类构造函数
 * @param origin 父类构造函数
 */
function setInherit(target,origin) {
    let F = function () {};
    F.prototype = origin.prototype;
    target.prototype = new F();
    target.prototype.constructor = target;
    target.prototype.uber = origin.prototype;
}

function getParent(elem,n) {
    if (n < 0){
        return null;
    }
    while (n-- && elem){
        elem = elem.parentElement;
    }
    return elem;
}

function isHTMLElement(elem) {
    return elem instanceof HTMLElement;
}

function isNode(node) {
    return node instanceof Node;
}



function getElementsArray(node) {
    
    if (!isHTMLElement(node)){
        log("Exception:getElementsArray:传入的不是HTMLElement");
        return null;
    }
    if (node.children.length === 0){
        return node;
    }

    let child = node.children;
    let length = child.length;
    let arr = [];
    for (let i = 0; i < length; i++){
        if (child[i].hasChildNodes()){
            arr.push(getElementsArray(child[i]));
        } else {
            arr.push(child[i]);
        }
    }
    return arr;
}



function getSiblingElement(elem, n) {

    if (getType(n) !== "number"){
        log("Exception:getSiblingElement:传入的不是数字");
        return elem;
    }
    while (n && elem){
        if (n > 0){
            if (elem.nextElementSibling){
                elem = elem.nextElementSibling;
            }else {
                while ((elem = elem.nextSibling) && elem.nodeType !== 1) {}
            }
            n--;

        } else {
            if (elem.previousElementSibling){
                elem = elem.previousElementSibling;
            } else {
                while ((elem = elem.previousSibling) && elem.nodeType !== 1) {}
            }
            n++;
        }
    }
    return elem;
}




function removeAllChildNode(elem) {

    if (!isNode(elem) || !elem.hasChildNodes()){
        return;
    }
    //这玩意会实时更新
    let cn = elem.childNodes;
    while (cn.length){
        elem.removeChild(cn[0]);
    }

}


function insertAfter(targetNode,afterNode) {

    try {
        if (!isNode(targetNode) || !isNode(afterNode)){
            return null;
        }
        let nextEle = afterNode.nextElementSibling;
        log(nextEle);
        if (nextEle){
            this.insertBefore(targetNode,nextEle);
        } else {
            this.appendChild(targetNode);
        }

    }catch (e) {
        log(e);
        return false;
    }
    return true;
}

//IE8及以下不支持(document.body.scrollLeft + document.documentElement.scrollLeft)
function getOffSetX() {
    return window.pageXOffset;
}

//IE8及以下不支持(document.body.scrollTop + document.documentElement.scrollTop)
function getOffSetY() {
    return window.pageYOffset;
}


//获取滚动条偏移像素
function getScrollOffset() {

    if (window.pageXOffset){
        //下面那个return 要是花括号和return不在同一行,就return不回去去了......
        return {
            x : window.pageXOffset,
            y : window.pageYOffset
        }
    }else {
        return {
            x : document.body.scrollLeft + document.documentElement.scrollLeft,
            y : document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

//获取模式
function getCompatMode() {
    return document.compatMode;
}

//获取可见窗口大小
function getWindowSize() {

    if (window.innerWidth){
        return {
            width : window.innerWidth,
            height : window.innerHeight
        }
    } else {

        if (getCompatMode() === 'BackCompat'){
            return {
                width : document.body.clientWidth,
                height : document.body.clientHeight
            }
        }
        else {
            return {
                width : document.documentElement.clientWidth,
                height : document.documentElement.clientHeight
            }
        }
    }

}
//对整个页面定位
function getElemPWH(elem) {
    if (isNode(elem)){
        //全部是x,y值
        return elem.getBoundingClientRect();
    } else {
        return {};
    }
}

//对有最近的定位属性的父级定位,如果没有,返回相对于文档的定位
function getElemOffset(elem) {

    return {

        width : elem.offsetWidth,
        height : elem.offsetHeight,
        left : elem.offsetLeft,
        top : elem.offsetTop,
        posParent : elem.offsetParent

    }
}


function getOffSetParent(elem) {

    if (isNode(elem)){
        return elem.offsetParent;
    } else {
        return null;
    }

}

/**
 *
 * @param elem element
 * @param prop 属性
 * @param spc 用于获取伪元素的属性(这个参数一般写after或before)
 * @returns {string}
 */
function getStyle(elem, prop, spc) {
    if (spc){
        spc = null;
    }
    if (window.getComputedStyle){
        return window.getComputedStyle(elem,spc)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}


/**
 *
 * @param elem 元素
 * @param type 类型
 * @param handle 函数
 */
function addEvent(elem, type, handle) {
    //程序this指向dom元素本身
    if (elem.addEventListener){
        elem.addEventListener(type,handle,false);
    }//这破函数ie独有的，程序this指向window
    else if (elem.attachEvent){
        handle = function () {
            handle.call(elem);
        };
        elem.attachEvent('on' + type,handle);
    } else {
        //this指向元素本身
        elem['on' + type] = handle;
    }
    return handle;
}

function removeEvent(elem, type, handle) {

    if (elem.removeEventListener){
        elem.removeEventListener(type,handle,false);
    } else if(elem.detachEvent){
        elem.detachEvent('on' + type,handle);
    }else {
        elem['on' + type] = null;
    }

}



function stopBubble(event) {
    if (event.stopPropagation){
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}


function calcelHandler(event) {
    if (event.preventDefault){
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}


function setDrag(elem,whenDown,whenMove,whenUp,obj) {

    if (elem){

        elem.onmousedown = function(ev){
            let disX = ev.pageX - parseInt(getStyle(elem,'left'));
            let disY = ev.pageY - parseInt(getStyle(elem,'top'));
            document.onmousemove = function (ev) {
                let event = ev || window.event;
                elem.style.cssFloat = 'absolute';
                elem.style.left = event.pageX - disX +  'px' ;
                elem.style.top = event.pageY - disY + 'px' ;
                if (typeof whenMove === "function"){
                    whenMove(ev,obj);
                }
            };
            elem.onmouseup = function () {
                document.onmousemove = null;
                if (typeof whenUp === "function"){
                    whenUp(ev,obj);
                }
            };

            if (typeof whenDown === "function"){
                whenDown(ev,obj);
            }


        };
    }
}


/**
 *
 * @param script
 * @param callbackOut
 * @param callbackIn
 * @param flag
 * @returns {boolean}
 */
function onLoadFinish(script, callbackOut, callbackIn, flag) {

    if (script.readyState){
        script.onreadystatechange = function(){
            if (script.readyState === "complete" || script.readyState === "Loaded"){
                if (getType(callbackOut) === "function"){
                    callbackOut();
                }
                if (flag){
                    eval(callbackIn);
                }
                else if(getType(callback[callbackIn]) === "function"){
                    callback[callbackIn]();
                }
            }
        };
    } else {
        script.onload = function(){
            if (getType(callbackOut) === "function"){
                callbackOut();
            }
            if (flag){
                eval(callbackIn);
            }
            else if (getType(callback[callbackIn]) === "function"){
                callback[callbackIn]();
            }

        };
    }
}

/**
 *
 * @param url
 * @param callbackOut 传入一个函数
 * @param callbackIn 传入一个字符串
 * @param flag 是否启用eval
 */
function loadScript(url, callbackOut, callbackIn,flag) {

    let script = document.createElement('script');
    script.type = "text/javascript";
    onLoadFinish(script,callbackOut,callbackIn,flag);
    //先绑定事件再加载资源
    script.src = url;
    document.head.appendChild(script);

}

/**
 *
 * @param elem 要居中的元素
 * @returns {boolean}
 */
function toCenter(elem) {
    if (!isHTMLElement(elem)){
        return false;
    }
    elem.style.position = 'fixed';
    elem.style.left = '50%';
    elem.style.top = '50%';
    let width = getStyle(elem,'width');
    let height = getStyle(elem,'height');
    elem.style.marginLeft = '-' + parseInt(width)/2 + 'px';
    elem.style.marginTop = '-' + parseInt(height)/2 + 'px';
    return true;
}


function toParentCenter(elem) {

    if (!isHTMLElement(elem)){
        return false;
    }
    let parent = getParent(elem,1);
    if (getStyle(parent,'position') !== 'static'){
        log('false');
        let div = document.createElement('div');
        parent.appendChild(div);
        div.appendChild(elem);
        parent = div;
        parent.style.height = '100%';
        parent.style.width = '100%';
    }
    if (parent === document.body){
        return toCenter(elem);
    }
    parent.style.position = 'relative';
    elem.style.position = 'absolute';
    elem.style.left = '0';
    elem.style.top = '0';
    elem.style.bottom = '0';
    elem.style.right = '0';
    elem.style.margin = 'auto';
}

function getRandomInt(minNum, maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random() * minNum + 1,10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum,10);
        default:
            return 0;
    }
}

function getPosition(elem) {

    if (!isNode(elem)){
        return false;
    }

    //可视区宽度
    let vw = getWindowSize().width;
    //可视区高度
    let vh = getWindowSize().height;

    let obj = getElemPWH(elem);

    return {
        top : obj.top,

        left : obj.left,

        right :vw - obj.right,

        bottom : vh - obj.bottom,

        width : obj.size,

        height : obj.height
    }
}

function getDate() {

    let date = new Date();
    return {
        year : date.getFullYear(),
        month : date.getMonth() + 1,
        day : date.getDate(),
        hour : date.getHours(),
        minute : date.getMinutes(),
        second : date.getSeconds(),
        weekDay : date.getDay() === 0 ? 7 : date.getDay(),
        time : date.getTime(),
    }
}

function getDateStr() {

    let date = new Date();
    let sec ;
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        + " " + date.getHours() + ":" + date.getMinutes() + ":" + ((sec = date.getSeconds()) < 10 ? '0' + sec : sec);
}


function cancelMenu()
{
    document.oncontextmenu = function () {
        return false;
    }
}

//获取浏览器对屏幕窗口位置
function getScreenPos() {

    return {
        x : window.screenX || window.screenLeft,
        y : window.screenY || window.screenTop
    }

}


function startMove(dom,attrObj,callback) {
    clearInterval(dom.timer);
    let speed = null,
        cur = null;
    dom.timer = setInterval(function () {
        let flag = true;
        for (let attr in attrObj){
            if (attrObj.hasOwnProperty(attr)){
                if (attr === 'opacity'){
                    cur = parseFloat(getStyle(dom,attr)) * 100;
                }else {
                    cur = parseInt(getStyle(dom,attr));
                }
                speed = (attrObj[attr] - cur) / 50;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if (attr === 'opacity'){
                    dom.style.opacity = (cur + speed)/100 + '';
                }else {
                    dom.style[attr] = cur + speed + 'px';
                }
                if (cur !== attrObj[attr]) {
                    flag = false;
                }
            }
        }
        if (flag){
            clearInterval(dom.timer);
            if (typeof callback === "function"){
                callback();
            }
        }
    })
}

function debounce(handler,delay) {

    let timer = null;
    return function () {
        let _self = this,
            _args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            handler.apply(_self,_args);
        },delay);
    }
}


function throttle(handler, time) {
    let preTime = 0;
    let curTime = 0;
    return function () {
        curTime = new Date().getTime();
        if (curTime - preTime > time){
            handler.apply(this,arguments);
            preTime = curTime;
        }
    }
}

function getCurrentUrlMessage() {


    let search = location.search.replace('?','');
    let searchArr = search.split('&');
    let obj = {};
    for (let i = 0,length = searchArr.length; i < length; i++){
        let keyValueArray = searchArr[i].split("=");
        obj[keyValueArray[0]] = keyValueArray[1];
    }

    return {
        protocol : location.protocol.replace(':',''),
        host : location.host,
        path : location.pathname,
        search : obj
    }
}

//dom.className映射行间class
function getDom(str) {

    let domArr = document.getElementsByTagName('*');
    let fiDomArr = {
        length : 0,
        push : Array.prototype.push
    };
    if (str.charAt(0) === '#'){
        let id = str.replace('#','');
        (function() {
            for (let i = 0; i < domArr.length; i++) {
                if (domArr[i].id === id){
                    fiDomArr.push(domArr[i]);
                }
            }
        })()
    } else if (str.charAt(0) === '.'){
        let domClass = str.replace('.','');
        (function() {
            for (let i = 0; i < domArr.length; i++) {
                if (domArr[i].className === domClass){
                    fiDomArr.push(domArr[i]);
                }
            }
        })()
    }else {
        let type = str;
        (function() {
            for (let i = 0; i < domArr.length; i++) {
                if (domArr[i].tagName.toUpperCase() === type.toUpperCase()){
                    fiDomArr.push(domArr[i]);
                }
            }
        })()
    }
    return fiDomArr;
}

