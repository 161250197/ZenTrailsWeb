// 画布-节点

import {
    createSingletonFunc,
    setElementStyle
} from '../util/base';

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

/**
 * 获取画布尺寸
 * @returns {{width: number, height: number}}
 */
function getCanvasWrapperSize () {
    const canvasWrapper = getCanvasWrapperElement();
    const { offsetWidth, offsetHeight } = canvasWrapper;
    return {
        width: offsetWidth,
        height: offsetHeight
    };
}

function updateCanvasSize () {
    const { width, height } = getCanvasWrapperSize();
    [
        getDownCanvasElement(),
        getUpCanvasElement()
    ].forEach(canvas => {
        canvas.width = width;
        canvas.height = height;
        setElementStyle(canvas,
            [
                `width: ${ width }px`,
                `height: ${ height }px`
            ]
        );
    });
}

/**
 * 初始化画布管理
 */
function initCanvasElement () {
    setTimeout(updateCanvasSize);
}

export {
    initCanvasElement,
    getDownCanvasElement,
    getUpCanvasElement,
    getCanvasWrapperSize
};
