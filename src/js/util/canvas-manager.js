// 画布管理

let canvasWrapperElement;

let getCanvasWrapperElement = function () {
    canvasWrapperElement = document.getElementById('canvas-wrapper');
    getCanvasWrapperElement = function () {
        return canvasWrapperElement;
    };
    return canvasWrapperElement;
};

let upCanvasElement;

/**
 * 获取上层画布节点
 * @returns {HTMLCanvasElement}
 */
let getUpCanvasElement = function () {
    upCanvasElement = document.getElementById('up-canvas');
    getUpCanvasElement = function () {
        return upCanvasElement;
    };
    return upCanvasElement;
};

let downCanvasElement;

/**
 * 获取下层画布节点
 * @returns {HTMLCanvasElement}
 */
let getDownCanvasElement = function () {
    downCanvasElement = document.getElementById('down-canvas');
    getDownCanvasElement = function () {
        return downCanvasElement;
    };
    return downCanvasElement;
};

/**
 * 初始化画布尺寸
 */
function initCanvasSize () {
    setTimeout(updateCanvasSize);
}

function updateCanvasSize () {
    const canvasWrapper = getCanvasWrapperElement();
    const { offsetWidth, offsetHeight } = canvasWrapper;
    setCanvasSize({
        width: offsetWidth,
        height: offsetHeight
    });
}

function setCanvasSize ({ width, height }) {
    [
        getDownCanvasElement(),
        getUpCanvasElement()
    ].forEach(canvas => {
        canvas.width = width;
        canvas.height = height;
        const widthHeightStyle = `width: ${ width }px; height: ${ height }px;`;
        canvas.setAttribute('style', widthHeightStyle);
    });
}

export {
    initCanvasSize,
    getDownCanvasElement,
    getUpCanvasElement
};
