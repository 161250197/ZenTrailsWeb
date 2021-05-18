// 基础工具

/**
 * 移除默认响应并组织事件冒泡
 * @param {Event} e 
 * @returns {Boolean} false
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
 * @returns {Boolean}
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
 * @param {HTMLElement} element 
 */
function hideElement (element) {
    element.classList.add(HIDE);
}

/**
 * @param {HTMLElement} element 
 */
function showElement (element) {
    element.classList.remove(HIDE);
}

export {
    preventDefaultStopPropagation,
    setElementEventUsed,
    isEventUsed,
    createSingletonFunc,
    hideElement,
    showElement
};