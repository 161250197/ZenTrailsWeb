// 画布-节点

import { createSingletonFunc, preventDefaultStopPropagation } from '../util/base';

let getCanvasWrapperElement = createSingletonFunc(
    function () {
        return document.getElementById('canvas-wrapper');
    },
    func => getCanvasWrapperElement = func
);

/**
 * 获取上层画布节点
 * @returns {HTMLCanvasElement}
 */
let getUpCanvasElement = createSingletonFunc(
    function () {
        return document.getElementById('up-canvas');
    },
    func => getUpCanvasElement = func
);

/**
 * 获取下层画布节点
 * @returns {HTMLCanvasElement}
 */
let getDownCanvasElement = createSingletonFunc(
    function () {
        return document.getElementById('down-canvas');
    },
    func => getDownCanvasElement = func
);

function updateCanvasSize () {
    const canvasWrapper = getCanvasWrapperElement();
    const { offsetWidth, offsetHeight } = canvasWrapper;
    [
        getDownCanvasElement(),
        getUpCanvasElement()
    ].forEach(canvas => {
        canvas.width = offsetWidth;
        canvas.height = offsetHeight;
        const widthHeightStyle = `width: ${ offsetWidth }px; height: ${ offsetHeight }px;`;
        canvas.setAttribute('style', widthHeightStyle);
    });
}

/**
 * 初始化画布管理
 */
function initCanvasElement () {
    setTimeout(updateCanvasSize);
    [
        getDownCanvasElement(),
        getUpCanvasElement()
    ].forEach(canvas => {
        canvas.addEventListener('contextmenu', preventDefaultStopPropagation);
    });
}

export {
    initCanvasElement,
    getDownCanvasElement,
    getUpCanvasElement
};
