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

/**
 * 计算两点之间连线的弧度
 * @param {{x: number, y: number}} start 
 * @param {{x: number, y: number}} end 
 * @returns {number} 单位弧度，向右为0，逆时针
 */
function calPointLineRadian (start, end) {
    const distanceX = end.x - start.x;
    const distanceY = end.y - start.y;
    let radian = Math.atan(distanceY / distanceX);
    if (distanceX < 0)
    {
        radian += Math.PI;
    }
    return radian;
}

/**
 * 计算两点之间连线的角度
 * @param {{x: number, y: number}} start 
 * @param {{x: number, y: number}} end 
 * @returns {number} 单位角度，向右为0，逆时针
 */
function calPointLineAngle (start, end) {
    const radian = calPointLineRadian(start, end);
    return radianToAngle(radian);
}

/**
 * @param {{x: number, y: number}} start 
 * @param {{x: number, y: number}} end 
 * @returns {number} 两点之间连线距离的距离
 */
function calPointDistance (start, end) {
    return Math.sqrt(calPointDistancePowTwo(start, end));
}

/**
 * @param {{x: number, y: number}} start 
 * @param {{x: number, y: number}} end 
 * @returns {number} 两点之间连线距离的距离平方
 */
function calPointDistancePowTwo (start, end) {
    const distanceX = end.x - start.x;
    const distanceY = end.y - start.y;
    const distanceSquare = distanceX * distanceX + distanceY * distanceY;
    return distanceSquare;
}

export {
    angleToRadian,
    calPointLineAngle,
    isInCircle,
    calPointDistance
};
