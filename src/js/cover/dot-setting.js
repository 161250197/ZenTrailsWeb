// 点的设置

import { setElementEventUsed } from '../util/base';

let __targetDot = {};

/**
 * 获取设置包装节点
 * @returns {HTMLElement}
 */
let getSettingWrapperElement = function () {
    const settingWrapperElement = document.getElementById('setting-wrapper');
    getSettingWrapperElement = function () {
        return settingWrapperElement;
    };
    return settingWrapperElement;
};

/**
 * 获取颜色设置节点
 * @returns {HTMLElement}
 */
let getColorSettingElement = function () {
    const settingWrapperElement = getSettingWrapperElement();
    const colorSettingElement = settingWrapperElement.getElementsByClassName('color')[0];
    getColorSettingElement = function () {
        return colorSettingElement;
    };
    return colorSettingElement;
};

/**
 * 获取方向设置节点
 * @returns {HTMLElement}
 */
let getDirectionSettingElement = function () {
    const settingWrapperElement = getSettingWrapperElement();
    const directionSettingElement = settingWrapperElement.getElementsByClassName('direction')[0];
    getDirectionSettingElement = function () {
        return directionSettingElement;
    };
    return directionSettingElement;
};

/**
 * 获取速度设置节点
 * @returns {HTMLElement}
 */
let getVelocitySettingElement = function () {
    const settingWrapperElement = getSettingWrapperElement();
    const velocitySettingElement = settingWrapperElement.getElementsByClassName('velocity')[0];
    getVelocitySettingElement = function () {
        return velocitySettingElement;
    };
    return velocitySettingElement;
};

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
