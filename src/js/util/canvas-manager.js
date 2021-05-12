// 画布管理

let getCanvasWrapperElement = function () {
    const canvasWrapperElement = document.getElementById('canvas-wrapper');
    getCanvasWrapperElement = function () {
        return canvasWrapperElement;
    };
    return canvasWrapperElement;
};

/**
 * 获取上层画布节点
 * @returns {HTMLCanvasElement}
 */
let getUpCanvasElement = function () {
    const upCanvasElement = document.getElementById('up-canvas');
    getUpCanvasElement = function () {
        return upCanvasElement;
    };
    return upCanvasElement;
};

/**
 * 获取下层画布节点
 * @returns {HTMLCanvasElement}
 */
let getDownCanvasElement = function () {
    const downCanvasElement = document.getElementById('down-canvas');
    getDownCanvasElement = function () {
        return downCanvasElement;
    };
    return downCanvasElement;
};

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

/**
 * 初始化画布管理
 */
function initCanvasManager () {
    setTimeout(updateCanvasSize);
}

export {
    initCanvasManager,
    getDownCanvasElement,
    getUpCanvasElement
};
