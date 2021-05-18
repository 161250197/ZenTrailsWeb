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
 * @returns {boolean}
 */
function randomBoolean () {
    return Math.random() > 0.5;
}

export {
    angleToRadian,
    radianToAngle,
    randomBoolean
};
