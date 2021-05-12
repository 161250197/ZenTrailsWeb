// 入口文件

import '../style/style.less';
import { initCanvasSize } from './util/canvas-manager';
import { initCoverManager } from './util/cover-manager';
import { initDotSetting } from './util/dot-setting';

initCanvasSize();
initDotSetting();
initCoverManager();
