// 点的设置

import { refreshCanvas } from '../canvas';
import { getTargetDot, removeTargetDot } from '../path';
import {
    createSingletonFunc,
    setElementEventUsed,
    hideElement,
    showElement
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

/**
 * 获取移除按钮节点
 * @returns {HTMLElement}
 */
let getRemoveBtnSettingElement = createSingletonFunc(
    function () {
        return getSettingWrapperElement().getElementsByClassName('remove')[0];
    },
    func => getRemoveBtnSettingElement = func
);

function initDotSetting () {
    const settingWrapperElement = getSettingWrapperElement();
    setElementEventUsed(settingWrapperElement);

    const colorSettingElement = getColorSettingElement();
    colorSettingElement.addEventListener('change', () => {
        const __targetDot = getTargetDot();
        __targetDot.color = colorSettingElement.value;
        refreshCanvas();
    });

    const directionSettingElement = getDirectionSettingElement();
    directionSettingElement.addEventListener('click', () => {
        const __targetDot = getTargetDot();
        __targetDot.isAntiClockwise = !__targetDot.isAntiClockwise;
        directionSettingElement.innerText = __targetDot.isAntiClockwise ? '逆时针' : '顺时针';
        refreshCanvas();
    });

    const velocitySettingElement = getVelocitySettingElement();
    velocitySettingElement.addEventListener('input', () => {
        const __targetDot = getTargetDot();
        __targetDot.angleVelocity = velocitySettingElement.value;
    });

    const removeBtnSettingElement = getRemoveBtnSettingElement();
    removeBtnSettingElement.addEventListener('click', () => {
        removeTargetDot();
    });
}

function showDotSetting (targetDot) {
    getColorSettingElement().value = targetDot.color;
    getDirectionSettingElement().innerText = targetDot.isAntiClockwise ? '逆时针' : '顺时针';
    getVelocitySettingElement().value = targetDot.angleVelocity;
    const settingWrapperElement = getSettingWrapperElement();
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
