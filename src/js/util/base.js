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

export {
    preventDefaultStopPropagation,
    setElementEventUsed,
    isEventUsed
};
