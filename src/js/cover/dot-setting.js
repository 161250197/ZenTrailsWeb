// 点的设置

import { refreshCanvas } from '../canvas';
import {
    getTargetDot,
    removeTargetDot
} from '../path/target';
import { setGuideAfterChangeDotSetting } from '../prompt/guide';
import {
    createSingletonFunc,
    setElementEventUsed,
    hideElement,
    showElement,
    emptyFunc,
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
    colorSettingElement.addEventListener('change', () => {
        const __targetDot = getTargetDot();
        __targetDot.color = colorSettingElement.value;
        refreshCanvas();
        setGuideAfterChangeDotSetting();
    });

    const directionSettingElement = __getDirectionSettingElement();
    directionSettingElement.addEventListener('click', () => {
        const __targetDot = getTargetDot();
        __targetDot.isAntiClockwise = !__targetDot.isAntiClockwise;
        __updateDirectionSettingElement(__targetDot);
        refreshCanvas();
        setGuideAfterChangeDotSetting();
    });

    const velocitySettingElement = __getVelocitySettingElement();
    velocitySettingElement.addEventListener('input', () => {
        const __targetDot = getTargetDot();
        __targetDot.angleVelocity = velocitySettingElement.value;
        setGuideAfterChangeDotSetting();
    });

    const removeBtnSettingElement = __getRemoveBtnSettingElement();
    removeBtnSettingElement.addEventListener('click', () => {
        removeTargetDot();
        setGuideAfterChangeDotSetting();
        refreshCanvas();
    });
}

/**
 * 显示首个节点的设置弹窗
 */
let showFirstDotSetting = emptyFunc;
function showFirstDotSettingFunc () {
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
let showFollowDotSetting = emptyFunc;
function showFollowDotSettingFunc (targetDot) {
    __getColorSettingElement().value = targetDot.color;
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
