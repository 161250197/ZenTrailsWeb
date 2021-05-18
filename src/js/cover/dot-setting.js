// 点的设置

import { createSingletonFunc, setElementEventUsed } from '../util/base';

let __targetDot = {};

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
        __targetDot.color = colorSettingElement.value;
    });

    const directionSettingElement = getDirectionSettingElement();
    directionSettingElement.addEventListener('click', () => {
        __targetDot.isAntiClockwise = !__targetDot.isAntiClockwise;
        directionSettingElement.innerText = __targetDot.isAntiClockwise ? '逆时针' : '顺时针';
    });

    const velocitySettingElement = getVelocitySettingElement();
    velocitySettingElement.addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });
    velocitySettingElement.addEventListener('input', () => {
        __targetDot.angleVelocity = velocitySettingElement.value;
    });
}

function setTargetDot (targetDot) {
    // TODO 统一管理
    __targetDot = targetDot;
    const colorSettingElement = getColorSettingElement();
    colorSettingElement.value = __targetDot.color;
    const directionSettingElement = getDirectionSettingElement();
    directionSettingElement.innerText = __targetDot.isAntiClockwise ? '逆时针' : '顺时针';
    const velocitySettingElement = getVelocitySettingElement();
    velocitySettingElement.value = __targetDot.angleVelocity;
}

export {
    initDotSetting,
    setTargetDot
};
