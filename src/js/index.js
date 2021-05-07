// 入口文件

import '../style/style.less';
import { init } from './util/init';
import { getDownCanvasElement, getCoverElement } from './util/canvas-manager';
import { setCanvas } from './util/draw-helper';

init();

(function () {
    const canvas = getDownCanvasElement();
    const cover = getCoverElement();

    function getXY (e) {
        const { clientX, clientY } =
            e.touches && e.touches[0] ?
                e.touches[0] :
                e;
        return { x: clientX, y: clientY };
    }

    setCanvas(canvas);

    function onCoverMousemove (e) {
        // TODO
        const position = getXY(e);
        console.log(position);
    }
    cover.addEventListener('mousemove', onCoverMousemove);
}());
