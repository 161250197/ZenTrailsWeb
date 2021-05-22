// 导出导入数据

import {
    setElementEventUsed,
    createSingletonFunc,
    hideElement,
    showElement,
    downloadFile
} from '../util/base';
import {
    setGuideAfterUploadData,
    setGuideAfterSaveData
} from '../prompt/guide';
import {
    getPathArr,
    setPathArr
} from '.';

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

const __uploadData = (function () {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.ZenTrailsWeb';
    inputElement.addEventListener('change', function () {
        if (inputElement.files.length === 0)
        {
            return;
        }
        const file = inputElement.files[0];
        reader.readAsText(file);
    });

    const reader = new FileReader();
    reader.onload = function () {
        const pathArr = (function () {
            // TODO
            const dataStr = __decodeFileContent(reader.result);
            console.log(dataStr);
            return [];
        });
        setPathArr(pathArr);
        setGuideAfterUploadData();
    };
    return function () {
        inputElement.click();
    };
}());

function __saveData () {
    const dataStr = (function () {
        // TODO
        const pathArr = getPathArr();
        console.log(pathArr);
        return 'test';
    }());
    downloadFile('data.ZenTrailsWeb', __encodeDataStr(dataStr));
    setGuideAfterSaveData();
}

function __decodeFileContent (content) {
    return decodeURIComponent(content);
}

function __encodeDataStr (dataStr) {
    return `data:text/plain;base64,${ btoa(encodeURIComponent(dataStr)) }`;
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
