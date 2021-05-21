// 基础工具

/**
 * 移除默认响应并组织事件冒泡
 * @param {Event} e 
 * @returns {boolean} false
 */
function preventDefaultStopPropagation (e) {
    setEventUsed(e);
    e.preventDefault();
    e.stopPropagation();
    return false;
}

/**
 * 设置节点相关事件已被使用响应
 * @param {HTMLElement} element 
 */
function setElementEventUsed (element) {
    element.addEventListener('click', setEventUsed);
    element.addEventListener('auxclick', setEventUsed);
    element.addEventListener('dblclick', setEventUsed);
}

/**
 * 设置事件已被使用
 * @param {Event} e 
 */
function setEventUsed (e) {
    e.__eventUsed = true;
}

/**
 * 检查事件是否已被使用
 * @param {Event} e 
 * @returns {boolean}
 */
function isEventUsed (e) {
    return !!e.__eventUsed;
}

/**
 * 创建单例模板方法
 * @param {Function} createFunc 
 * @param {Function} updateCallback 
 * @returns {Function}
 */
function createSingletonFunc (createFunc, updateCallback) {
    return function () {
        const __result = createFunc();
        updateCallback(function () {
            return __result;
        });
        return __result;
    };
}

const HIDE = 'hide';

/**
 * 隐藏节点
 * @param {HTMLElement} element 
 */
function hideElement (element) {
    addElementClass(element, HIDE);
}

/**
 * 显示节点
 * @param {HTMLElement} element 
 */
function showElement (element) {
    removeElementClass(element, HIDE);
}

/**
 * 设置节点样式
 * @param {HTMLElement} element 
 * @param {string|Array<string>} style 
 */
function setElementStyle (element, style) {
    const styleSeparater = '; ';
    const styleStr =
        style instanceof Array ?
            style.join(styleSeparater) :
            style;

    element.setAttribute('style', styleStr);
}

/**
 * 添加节点样式类
 * @param {HTMLElement} element 
 * @param {string} className 
 */
function addElementClass (element, className) {
    element.classList.add(className);
}

/**
 * 删除节点样式类
 * @param {HTMLElement} element 
 * @param {string} className 
 */
function removeElementClass (element, className) {
    element.classList.remove(className);
}

/**
 * 空方法
 */
function emptyFunc () { }

export {
    emptyFunc,
    preventDefaultStopPropagation,
    setElementEventUsed,
    isEventUsed,
    createSingletonFunc,
    hideElement,
    showElement,
    setElementStyle,
    addElementClass,
    removeElementClass
};
