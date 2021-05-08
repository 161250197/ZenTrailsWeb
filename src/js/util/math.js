// 数学工具类

/**
 * 角度转弧度
 * @param {Number} angle 角度
 * @return {Number} 弧度
 */
function angleToRadian (angle) {
    return angle * Math.PI / 180;
}

/**
 * 弧度转角度
 * @param {Number} radian 弧度
 * @return {Number} 角度
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
