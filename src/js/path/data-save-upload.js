// 导出导入数据

import {
    setElementEventUsed,
    createSingletonFunc,
    hideElement,
    showElement
} from '../util/base';

let __getDataUploadBtnElement = createSingletonFunc(
    function () {
        return document.getElementById('data-upload-btn');
    },
    func => __getDataUploadBtnElement = func
);

let __getDataSaveBtnElement = createSingletonFunc(
    function () {
        return document.getElementById('data-save-btn');
    },
    func => __getDataSaveBtnElement = func
);

function __uploadData () {
    // TODO
}

function __saveData () {
    // TODO
}

/**
 * 隐藏数据导出节点
 */
function hideDataSaveBtnElement () {
    hideElement(__getDataSaveBtnElement());
}

/**
 * 显示数据导出节点
 */
function showDataSaveBtnElement () {
    showElement(__getDataSaveBtnElement());
}

/**
 * 隐藏数据导入节点
 */
function hideDataUploadBtnElement () {
    hideElement(__getDataUploadBtnElement());
}

/**
 * 显示数据导入节点
 */
function showDataUploadBtnElement () {
    showElement(__getDataUploadBtnElement());
}

/**
 * 初始化导出导入数据
 */
function initDataSaveUpload () {
    const dataUploadBtnElement = __getDataUploadBtnElement();
    setElementEventUsed(dataUploadBtnElement);
    dataUploadBtnElement.addEventListener('click', __uploadData);

    const dataSaveBtnElement = __getDataSaveBtnElement();
    setElementEventUsed(dataSaveBtnElement);
    dataSaveBtnElement.addEventListener('click', __saveData);
}

export {
    hideDataSaveBtnElement,
    showDataSaveBtnElement,
    hideDataUploadBtnElement,
    showDataUploadBtnElement,
    initDataSaveUpload
};
