// 数据规整

// eslint-disable-next-line no-unused-vars
import { Dot } from './data-structure';
import {
    calPointDistance,
    calPointLineAngle,
    calPosition
} from '../util/math';

/**
 * 规整首个节点位置
 * @param {{x: number, y: number}} position 
 * @returns {{x: number, y: number}}
 */
function regularFirstDotPosition (position) {
    function __roundPositionNumber (num) {
        const grid = 10;
        return Math.round(num / grid) * grid;
    }
    let { x, y } = position;
    x = __roundPositionNumber(x);
    y = __roundPositionNumber(y);
    return { x, y };
}

/**
 * 规整后续节点属性
 * @param {{x: number, y: number}} position 
 * @param {Dot} lastDot 
 * @returns {{position: {x: number, y: number}, radius: number, angle: number}}
 */
function regularFollowDotProperty (position, lastDot) {
    function __roundDistanceNumber (num) {
        const grid = 10;
        return Math.ceil(num / grid) * grid;
    }
    function __roundAngleNumber (num, radius) {
        const radiusArr = [50, 100, 200];
        const gridArr = [30, 20, 10, 5];
        let index = 0;
        while (index < radiusArr.length && radiusArr[index] < radius)
        {
            index++;
        }
        const grid = gridArr[index];
        return Math.round(num / grid) * grid;
    }
    let radius = calPointDistance(lastDot, position);
    radius = __roundDistanceNumber(radius);
    let angle = calPointLineAngle(lastDot, position);
    angle = __roundAngleNumber(angle, radius);
    position = calPosition(lastDot, angle, radius);
    return { position, radius, angle };
}

export {
    regularFirstDotPosition,
    regularFollowDotProperty
};
