// 点的设置

import { refreshCanvas } from '../canvas';
import { setLastColor } from '../canvas/color';
import {
    getTargetDot,
    removeTargetDot
} from '../path/target';
import {
    createSingletonFunc,
    setElementEventUsed,
    hideElement,
    showElement,
    removeElementClass,
    addElementClass
} from '../util/base';

let __getSettingWrapperElement = createSingletonFunc(
    function () {
        return document.getElementById('setting-wrapper');
    },
    func => __getSettingWrapperElement = func
);

let __getColorSettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .color');
    },
    func => __getColorSettingElement = func
);

let __getOpacitySettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .opacity');
    },
    func => __getOpacitySettingElement = func
);

let __getDirectionSettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .direction');
    },
    func => __getDirectionSettingElement = func
);

let __getVelocitySettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .velocity');
    },
    func => __getVelocitySettingElement = func
);

let __getRemoveBtnSettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .remove');
    },
    func => __getRemoveBtnSettingElement = func
);

let __getFirstDotSettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .first-dot-setting');
    },
    func => __getFirstDotSettingElement = func
);

let __getFollowDotSettingElement = createSingletonFunc(
    function () {
        return document.querySelector('#setting-wrapper .follow-dot-setting');
    },
    func => __getFollowDotSettingElement = func
);

/**
 * 初始化节点设置
 */
function initDotSetting () {
    const settingWrapperElement = __getSettingWrapperElement();
    setElementEventUsed(settingWrapperElement);

    const colorSettingElement = __getColorSettingElement();
    colorSettingElement.addEventListener('input', (event) => {
        const color = event.target.value;
        const __targetDot = getTargetDot();
        __targetDot.color = color;
        setLastColor(color);
        refreshCanvas();
    }, false);

    const opacitySettingElement = __getOpacitySettingElement();
    opacitySettingElement.addEventListener('input', (event) => {
        const opacity = event.target.value;
        const __targetDot = getTargetDot();
        __targetDot.opacity = opacity / 100;
        refreshCanvas();
    });

    const directionSettingElement = __getDirectionSettingElement();
    directionSettingElement.addEventListener('click', () => {
        const __targetDot = getTargetDot();
        __targetDot.isAntiClockwise = !__targetDot.isAntiClockwise;
        __updateDirectionSettingElement(__targetDot);
        refreshCanvas();
    });

    const velocitySettingElement = __getVelocitySettingElement();
    velocitySettingElement.addEventListener('input', (event) => {
        const angleVelocity = event.target.value;
        const __targetDot = getTargetDot();
        __targetDot.angleVelocity = angleVelocity;
    });

    const removeBtnSettingElement = __getRemoveBtnSettingElement();
    removeBtnSettingElement.addEventListener('click', () => {
        removeTargetDot();
    });
}

/**
 * 显示首个节点的设置弹窗
 */
function showFirstDotSetting () {
    hideElement(__getFollowDotSettingElement());
    showElement(__getFirstDotSettingElement());
    showElement(__getSettingWrapperElement());
}

function __updateDirectionSettingElement (targetDot) {
    const directionSettingElement = __getDirectionSettingElement();
    const isClockwiseClass = 'is-clockwise';
    const isAntiClockwiseClass = 'is-anti-clockwise';
    removeElementClass(directionSettingElement, isClockwiseClass);
    removeElementClass(directionSettingElement, isAntiClockwiseClass);
    addElementClass(directionSettingElement, targetDot.isAntiClockwise ? isAntiClockwiseClass : isClockwiseClass);
}

/**
 * 显示后续节点的设置弹窗
 * @param {Dot} targetDot 
 */
function showFollowDotSetting (targetDot) {
    __getColorSettingElement().value = targetDot.color;
    __getOpacitySettingElement().value = targetDot.opacity * 100;
    __updateDirectionSettingElement(targetDot);
    __getVelocitySettingElement().value = targetDot.angleVelocity;
    hideElement(__getFirstDotSettingElement());
    showElement(__getFollowDotSettingElement());
    showElement(__getSettingWrapperElement());
}

/**
 * 隐藏节点设置弹窗
 */
function hideDotSetting () {
    hideElement(__getSettingWrapperElement());
}

export {
    initDotSetting,
    showFirstDotSetting,
    showFollowDotSetting,
    hideDotSetting
};
