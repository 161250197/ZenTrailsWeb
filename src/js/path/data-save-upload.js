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
import { refreshCanvas } from '../canvas';

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
            console.log(dataStr.split('\n'));
            return [];
        });
        setPathArr(pathArr);
        refreshCanvas();
        setGuideAfterUploadData();
    };
    return function () {
        inputElement.click();
    };
}());

function __saveData () {
    const dataStr = (function () {
        const {
            createFirstIdDot,
            createFollowIdDot,
            getFirstIdDotArr,
            getFollowIdDotArr
        } = (function () {
            let id = 0;
            const idFirstDotArr = [];
            const idFollowDotArr = [];
            return {
                createFirstIdDot: function (dot) {
                    const idDot = { id, dot };
                    idFirstDotArr.push(idDot);
                    id++;
                    return idDot;
                },
                getFirstIdDotArr: function () {
                    return idFirstDotArr;
                },
                createFollowIdDot: function (dot) {
                    const idDot = { id, dot };
                    idFollowDotArr.push(idDot);
                    id++;
                    return idDot;
                },
                getFollowIdDotArr: function () {
                    return idFollowDotArr;
                }
            };
        }());
        const idToFollowIdsArr = (function () {
            const __idToFollowIdsArr = [];
            const pathArr = getPathArr();
            let idDotArr = pathArr.map(({ firstDot }) => createFirstIdDot(firstDot));
            while (idDotArr.length)
            {
                let newIdDotArr = [];
                for (const { dot, id } of idDotArr)
                {
                    const followIdDotArr = dot.followDots.map(createFollowIdDot);
                    __idToFollowIdsArr.push({
                        id,
                        followIds: followIdDotArr.map(({ id }) => id)
                    });
                    newIdDotArr = newIdDotArr.concat(followIdDotArr);
                }
                idDotArr = newIdDotArr;
            }
            return __idToFollowIdsArr;
        }());
        const idToFollowIdsStr = (function () {
            let idToFollowIdsStrArr = [];
            for (const { id, followIds } of idToFollowIdsArr)
            {
                if (followIds.length)
                {
                    idToFollowIdsStrArr.push(`${ id } ${ followIds.join(',') }`);
                }
            }
            return idToFollowIdsStrArr.join(';');
        }());
        const firstIdDotStr = (function () {
            return getFirstIdDotArr()
                .map(({ id, dot }) => {
                    const { x, y } = dot;
                    return `${ id } ${ x } ${ y }`;
                })
                .join(';');
        }());
        const followIdDotStr = (function () {
            return getFollowIdDotArr()
                .map(({ id, dot }) => {
                    const { x, y, angleVelocity, isAntiClockwise, color } = dot;
                    return `${ id } ${ x } ${ y } ${ angleVelocity } ${ isAntiClockwise ? 1 : 0 } ${ color }`;
                })
                .join(';');
        }());
        return [
            idToFollowIdsStr,
            firstIdDotStr,
            followIdDotStr
        ].join('\n');
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
