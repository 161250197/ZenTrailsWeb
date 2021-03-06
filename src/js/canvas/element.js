// 画布节点

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
 * 获取导出画布节点
 * @returns {HTMLCanvasElement}
 */
let getExportCanvasElement = createSingletonFunc(
    function () {
        return document.getElementById('export-canvas');
    },
    func => getExportCanvasElement = func
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

/**
 * 刷新画布尺寸
 */
function updateCanvasSize () {
    const { width, height } = getCanvasWrapperSize();
    [
        getExportCanvasElement(),
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
    updateCanvasSize,
    initCanvasElement,
    getExportCanvasElement,
    getDownCanvasElement,
    getUpCanvasElement,
    getCanvasWrapperSize
};
