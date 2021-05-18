// 点的设置

import { getCanvasWrapperSize } from '../canvas/element';
import { getTargetDot } from '../path';
import {
    createSingletonFunc,
    setElementEventUsed,
    hideElement,
    showElement,
    setElementStyle
} from '../util/base';

/**
 * 获取设置包装节点
 * @returns {HTMLElement}
 */
let getSettingWrapperElement = createSingletonFunc(
    function () {
        return document.getElementById('setting-wrapper');
    },
    func => getSettingWrapperElement = func
);

/**
 * 获取颜色设置节点
 * @returns {HTMLElement}
 */
let getColorSettingElement = createSingletonFunc(
    function () {
        return getSettingWrapperElement().getElementsByClassName('color')[0];
    },
    func => getColorSettingElement = func
);

/**
 * 获取方向设置节点
 * @returns {HTMLElement}
 */
let getDirectionSettingElement = createSingletonFunc(
    function () {
        return getSettingWrapperElement().getElementsByClassName('direction')[0];
    },
    func => getDirectionSettingElement = func
);

/**
 * 获取速度设置节点
 * @returns {HTMLElement}
 */
let getVelocitySettingElement = createSingletonFunc(
    function () {
        return getSettingWrapperElement().getElementsByClassName('velocity')[0];
    },
    func => getVelocitySettingElement = func
);

function initDotSetting () {
    const settingWrapperElement = getSettingWrapperElement();
    setElementEventUsed(settingWrapperElement);

    const colorSettingElement = getColorSettingElement();
    colorSettingElement.addEventListener('change', () => {
        const __targetDot = getTargetDot();
        __targetDot.color = colorSettingElement.value;
    });

    const directionSettingElement = getDirectionSettingElement();
    directionSettingElement.addEventListener('click', () => {
        const __targetDot = getTargetDot();
        __targetDot.isAntiClockwise = !__targetDot.isAntiClockwise;
        directionSettingElement.innerText = __targetDot.isAntiClockwise ? '逆时针' : '顺时针';
    });

    const velocitySettingElement = getVelocitySettingElement();
    velocitySettingElement.addEventListener('input', () => {
        const __targetDot = getTargetDot();
        __targetDot.angleVelocity = velocitySettingElement.value;
    });
}

function getDotSettingPosition ({ x, y }) {
    const { width, height } = getCanvasWrapperSize();
    const left = x + 250 > width ? x - 225 : x + 25;
    const top = y + 250 > height ? y - 225 : y + 25;
    return { left, top };
}

function showDotSetting (targetDot) {
    getColorSettingElement().value = targetDot.color;
    getDirectionSettingElement().innerText = targetDot.isAntiClockwise ? '逆时针' : '顺时针';
    getVelocitySettingElement().value = targetDot.angleVelocity;
    const settingWrapperElement = getSettingWrapperElement();
    const { left, top } = getDotSettingPosition(targetDot);
    setElementStyle(settingWrapperElement,
        [
            `left: ${ left }px`,
            `top: ${ top }px`
        ]
    );
    showElement(settingWrapperElement);
}

function hideDotSetting () {
    hideElement(getSettingWrapperElement());
}

export {
    initDotSetting,
    showDotSetting,
    hideDotSetting
};
