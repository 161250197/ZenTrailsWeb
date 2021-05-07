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
function drawCircle ({ x, y }, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
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
    clearCanvas
};
