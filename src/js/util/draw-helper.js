// 绘制辅助

let ctx;

/**
 * 设置绘制的画布节点
 * @param {HTMLCanvasElement} canvas 
 */
function setCanvas (canvas) {
    ctx = canvas.getContext('2d');
}

/**
 * 绘制圆形
 * @param {{x: Number, y: Number}}} param0 圆心
 * @param {Number} radius 半径
 */
function drawCircle ({ x, y }, radius = 10) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}

/**
 * 开启绘制路径
 * @param {{x: Number, y: Number}} dot 
 */
function startPath ({ x, y }) {
    ctx.beginPath();
    ctx.moveTo(x, y);
}

/**
 * 连接新的路径点
 * @param {{x: Number, y: Number}} dot 
 */
function concatDot ({ x, y }) {
    ctx.lineTo(x, y);
    ctx.stroke();
}

/**
 * 结束路径
 */
function closePath () {
    ctx.closePath();
}

/**
 * 清空画布
 */
function clearCanvas () {
    const maxSafeInteger = Number.MAX_SAFE_INTEGER;

    ctx.clearRect(0, 0, maxSafeInteger, maxSafeInteger);
}

export {
    setCanvas,
    drawCircle,
    startPath,
    concatDot,
    closePath,
    clearCanvas
};
