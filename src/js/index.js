// 入口文件

import '../style/style.less';
import { initCanvasElement } from './canvas/element';
import { initCartoonManager } from './cartoon';
import { initCoverManager } from './cover';
import { initDotSetting } from './cover/dot-setting';

initCanvasElement();
initDotSetting();
initCoverManager();
initCartoonManager();
