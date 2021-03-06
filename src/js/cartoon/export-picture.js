// 导出图片

import { getExportCanvasDrawHelper } from '../canvas/draw-helper';
import {
    getCanvasWrapperSize,
    getExportCanvasElement
} from '../canvas/element';
import {
    createSingletonFunc,
    downloadFile,
    hideElement,
    setElementEventUsed,
    showElement
} from '../util/base';

let __getExportPictureElement = createSingletonFunc(
    function () {
        return document.getElementById('export-picture-btn');
    },
    func => __getExportPictureElement = func
);

/**
 * 显示导出图片节点
 */
function showExportPictureElement () {
    showElement(__getExportPictureElement());
}

/**
 * 隐藏导出图片节点
 */
function hideExportPictureElement () {
    hideElement(__getExportPictureElement());
}

function __exportPicture () {
    const wrapperSize = getCanvasWrapperSize();
    const drawHelper = getExportCanvasDrawHelper();
    const imageData = drawHelper.getImageData(wrapperSize);
    drawHelper.drawWhiteShadow();
    const canvas = getExportCanvasElement();
    const dataUrl = canvas.toDataURL('image/png');
    downloadFile('ZenTrailsWeb.png', dataUrl);
    drawHelper.putImageData(imageData);
}

/**
 * 初始化导出图片
 */
function initExportPicture () {
    const exportPictureElement = __getExportPictureElement();
    setElementEventUsed(exportPictureElement);
    exportPictureElement.addEventListener('click', __exportPicture);
}

export {
    showExportPictureElement,
    hideExportPictureElement,
    initExportPicture
};
