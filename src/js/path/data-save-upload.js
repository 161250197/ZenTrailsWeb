// 导出导入数据

import {
    setElementEventUsed,
    createSingletonFunc,
    hideElement,
    showElement
} from '../util/base';
import {
    setGuideAfterUploadData,
    setGuideAfterSaveData
} from '../prompt/guide';

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
    setGuideAfterUploadData();
}

function __saveData () {
    // TODO
    setGuideAfterSaveData();
}

/**
 * 隐藏数据导出节点
 */
function hideDataSaveBtnElement () {
    hideElement(__getDataSaveBtnElement());
}

/**
 * 隐藏数据导入节点
 */
function hideDataUploadBtnElement () {
    hideElement(__getDataUploadBtnElement());
}

const {
    enableSaveData,
    showDataSaveBtnElement
} = (function () {
    let saveDataEnabled = false;
    return {
        enableSaveData: function () {
            saveDataEnabled = true;
        },
        showDataSaveBtnElement: function () {
            if (saveDataEnabled)
            {
                showElement(__getDataSaveBtnElement());
            }
        }
    };
}());

const {
    enableUploadData,
    showDataUploadBtnElement
} = (function () {
    let saveDataEnabled = false;
    return {
        enableUploadData: function () {
            saveDataEnabled = true;
        },
        showDataUploadBtnElement: function () {
            if (saveDataEnabled)
            {
                showElement(__getDataUploadBtnElement());
            }
        }
    };
}());

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
    enableSaveData,
    enableUploadData,
    hideDataSaveBtnElement,
    showDataSaveBtnElement,
    hideDataUploadBtnElement,
    showDataUploadBtnElement,
    initDataSaveUpload
};
