// 点的设置

import { refreshCanvas } from '../canvas';
import { getTargetDot, removeTargetDot } from '../path';
import {
    createSingletonFunc,
    setElementEventUsed,
    hideElement,
    showElement,
    emptyFunc
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
        return document.querySelector('#setting-wrapper .color');
    },
    func => getColorSettingElement = func
);

/**
 * 获取方向设置节点
 * @returns {HTMLElement}
 */
let getDirectionSettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .direction');
    },
    func => getDirectionSettingElement = func
);

/**
 * 获取速度设置节点
 * @returns {HTMLElement}
 */
let getVelocitySettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .velocity');
    },
    func => getVelocitySettingElement = func
);

/**
 * 获取移除按钮节点
 * @returns {HTMLElement}
 */
let getRemoveBtnSettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .remove');
    },
    func => getRemoveBtnSettingElement = func
);

/**
 * 获取首个节点的设置
 * @returns {HTMLElement}
 */
let getFirstDotSettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .first-dot-setting');
    },
    func => getFirstDotSettingElement = func
);

/**
 * 获取后续节点的设置
 * @returns {HTMLElement}
 */
let getFollowDotSettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .follow-dot-setting');
    },
    func => getFollowDotSettingElement = func
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

/**
 * 显示首个节点的设置弹窗
 */
let showFirstDotSetting = emptyFunc;
function showFirstDotSettingFunc () {
    hideElement(getFollowDotSettingElement());
    showElement(getFirstDotSettingElement());
    showElement(getSettingWrapperElement());
}

/**
 * 显示后续节点的设置弹窗
 * @param {Dot} targetDot 
 */
let showFollowDotSetting = emptyFunc;
function showFollowDotSettingFunc (targetDot) {
    getColorSettingElement().value = targetDot.color;
    getDirectionSettingElement().innerText = targetDot.isAntiClockwise ? '逆时针' : '顺时针';
    getVelocitySettingElement().value = targetDot.angleVelocity;
    hideElement(getFirstDotSettingElement());
    showElement(getFollowDotSettingElement());
    showElement(getSettingWrapperElement());
}

/**
 * 隐藏节点设置弹窗
 */
function hideDotSetting () {
    hideElement(getSettingWrapperElement());
}

/**
 * 启用显示节点设置弹窗
 */
function enableShowDotSetting () {
    showFollowDotSetting = showFollowDotSettingFunc;
    showFirstDotSetting = showFirstDotSettingFunc;
}

export {
    initDotSetting,
    showFirstDotSetting,
    showFollowDotSetting,
    hideDotSetting,
    enableShowDotSetting
};
