// 画布-节点

import {
    createSingletonFunc,
    setElementStyle
} from '../util/base';

let __getCanvasWrapperElement = createSingletonFunc(
    function () {
        return document.getElementById('canvas-wrapper');
    },
    func => __getCanvasWrapperElement = func
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
    const canvasWrapper = __getCanvasWrapperElement();
    const { offsetWidth, offsetHeight } = canvasWrapper;
    return {
        width: offsetWidth,
        height: offsetHeight
    };
}

function __updateCanvasSize () {
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
    setTimeout(__updateCanvasSize);
}

export {
    initCanvasElement,
    getDownCanvasElement,
    getUpCanvasElement,
    getCanvasWrapperSize
};
