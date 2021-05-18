// 数学工具类

/**
 * 角度转弧度
 * @param {number} angle 角度
 * @return {number} 弧度
 */
function angleToRadian (angle) {
    return angle * Math.PI / 180;
}

/**
 * 弧度转角度
 * @param {number} radian 弧度
 * @return {number} 角度
 */
function radianToAngle (radian) {
    return radian * 180 / Math.PI;
}

/**
 * @param {{x: number, y: number}} param0 点
 * @param {{x: number, y: number}} circleCenter 圆心
 * @param {number} radius 圆的半径
 * @param {?number} extra 拓展的可响应区域
 */
function isInCircle ({ x, y }, circleCenter, radius, extra = 0) {
    radius = radius + extra;
    const distanceX = x - circleCenter.x;
    const distanceY = y - circleCenter.y;
    const distanceSquare = distanceX * distanceX + distanceY * distanceY;
    const radiusSquare = radius * radius;
    return radiusSquare >= distanceSquare;
}

export {
    angleToRadian,
    radianToAngle,
    isInCircle
};
