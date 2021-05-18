// 画布-节点

let getCanvasWrapperElement = function () {
    const __canvasWrapperElement = document.getElementById('canvas-wrapper');
    getCanvasWrapperElement = function () {
        return __canvasWrapperElement;
    };
    return __canvasWrapperElement;
};

/**
 * 获取上层画布节点
 * @returns {HTMLCanvasElement}
 */
let getUpCanvasElement = function () {
    const __upCanvasElement = document.getElementById('up-canvas');
    getUpCanvasElement = function () {
        return __upCanvasElement;
    };
    return __upCanvasElement;
};

/**
 * 获取下层画布节点
 * @returns {HTMLCanvasElement}
 */
let getDownCanvasElement = function () {
    const __downCanvasElement = document.getElementById('down-canvas');
    getDownCanvasElement = function () {
        return __downCanvasElement;
    };
    return __downCanvasElement;
};

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
}

export {
    initCanvasElement,
    getDownCanvasElement,
    getUpCanvasElement
};
