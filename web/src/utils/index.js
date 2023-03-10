/**
 * @Author: 王林
 * @Date: 2021-07-11 21:38:09
 * @Desc: 全屏事件检测
 */
const getOnfullscreEnevt = () => {
  if (document.documentElement.requestFullScreen) {
    return 'onfullscreenchange'
  } else if (document.documentElement.webkitRequestFullScreen) {
    return 'onwebkitfullscreenchange'
  } else if (document.documentElement.mozRequestFullScreen) {
    return 'onmozfullscreenchange'
  } else if (document.documentElement.msRequestFullscreen) {
    return 'onmsfullscreenchange'
  }
}

export const fullscrrenEvent = getOnfullscreEnevt()

/**
 * @Author: 王林
 * @Date: 2021-07-11 21:45:06
 * @Desc: 全屏
 */
export const fullScreen = element => {
  if (element.requestFullScreen) {
    element.requestFullScreen()
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  }
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2022-10-24 14:16:18
 * @Desc: 文件转buffer
 */
export const fileToBuffer = file => {
  return new Promise(r => {
    const reader = new FileReader()
    reader.onload = () => {
      r(reader.result)
    }
    reader.readAsArrayBuffer(file)
  })
}

export function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


export function initUniver(content,setting){
  switch (content) {
  case 'sheet':
    initSheet(setting)
    break;
  case 'doc':
    initDoc(setting)
    break;
  case 'slide':
    initSlide(setting)
    break;
  case 'DEMO1':
  case 'DEMO2':
  case 'DEMO3':
  case 'DEMO4':
    initSheetByDemo(content,setting)
    break;

  default:
    break;
}

}

export function initSheet(setting) {
  const {toolBar,refs} = setting
let cellData = {}

  cellData = {
    0: {
      0: {
        m: '',
        v: ''
      }
    }
  }


const { univerSheetCustom, CommonPluginData } = UniverPreactTs
const { DEFAULT_WORKBOOK_DATA } = CommonPluginData
const sheetConfig = {
  container: refs,
  layout: {
    sheetContainerConfig: {
      infoBar: false,
      formulaBar: false,
      toolBar,
      sheetBar: false,
      countBar: false,
      rightMenu: false
    }
  },
  selections: {
    'sheet-01': [
      {
        selection: {
          startRow: 0,
          endRow: 0,
          startColumn: 3,
          endColumn: 3
        },
        cell: {
          row: 0,
          column: 3
        }
      }
    ]
  }
}

let columnCount = 13
if (window.innerWidth < 1366) {
  columnCount = 7
}
const config = {
  id: makeid(6),
  styles: null,
  namedRanges: null,
  sheetOrder: [],
  sheets: {
    'sheet-01': {
      type: 0,
      id: 'sheet-01',
      name: 'sheet1',
      columnCount,
      status: 1,
      cellData
    }
  }
}
const coreConfig = Object.assign({}, DEFAULT_WORKBOOK_DATA, config)

univerSheetCustom({
  coreConfig,
  baseSheetsConfig: sheetConfig
})
}
export function initSheetByDemo(demo,setting) {
  const {toolBar,refs} = setting
const { univerSheetCustom, CommonPluginData, UniverCore } = UniverPreactTs
const {
  DEFAULT_WORKBOOK_DATA_DEMO1,
  DEFAULT_WORKBOOK_DATA_DEMO2,
  DEFAULT_WORKBOOK_DATA_DEMO3,
  DEFAULT_WORKBOOK_DATA_DEMO4,
} = CommonPluginData

const demoInfo = {
  DEMO1: DEFAULT_WORKBOOK_DATA_DEMO1,
  DEMO2: DEFAULT_WORKBOOK_DATA_DEMO2,
  DEMO3: DEFAULT_WORKBOOK_DATA_DEMO3,
  DEMO4: DEFAULT_WORKBOOK_DATA_DEMO4
}
const sheetConfig = {
  container: refs,
  layout: {
    sheetContainerConfig: {
      infoBar: false,
      formulaBar: false,
      toolBar,
      sheetBar: false,
      countBar: false,
      rightMenu: false
    }
  },
  selections: {
    'sheet-01': [
      {
        selection: {
          startRow: 0,
          endRow: 0,
          startColumn: 3,
          endColumn: 3
        },
        cell: {
          row: 0,
          column: 3
        }
      }
    ]
  }
}

const coreConfig = UniverCore.Tools.deepClone(demoInfo[demo])

coreConfig.id = makeid(6)
coreConfig.sheetOrder = []
univerSheetCustom({
  coreConfig,
  baseSheetsConfig: sheetConfig
})
}
export function initDoc(setting) {
  const {toolBar,refs} = setting
const { univerDocCustom, UniverCore, CommonPluginData } = UniverPreactTs

const { DEFAULT_DOCUMENT_DATA_EN } = CommonPluginData

const coreConfig = UniverCore.Tools.deepClone(DEFAULT_DOCUMENT_DATA_EN)
coreConfig.id = makeid(6)

const docConfig = {
  container: refs,
  layout: {
    innerRight: false,
    outerLeft: false,
    infoBar: false,
    toolBar
  }
}
univerDocCustom({
  coreConfig,
  baseDocsConfig: docConfig
})
}
export function initSlide(setting) {
  const {toolBar,refs} = setting
const { univerSlideCustom, UniverCore, CommonPluginData } = UniverPreactTs
const { DEFAULT_SLIDE_DATA } = CommonPluginData

const coreConfig = UniverCore.Tools.deepClone(DEFAULT_SLIDE_DATA)
coreConfig.id = makeid(6)

const slideConfig = {
  container: refs,
  layout: {
    innerLeft: false,
    innerRight: false,
    outerLeft: false,
    infoBar: false,
    toolBar
  }
}
univerSlideCustom({
  coreConfig,
  baseSlidesConfig: slideConfig
})
}

export function initUniverNew(content,setting) {
  switch (content) {
    case 'sheet':
      initSheetNew(setting)
      break;
    case 'doc':
      initDocNew(setting)
      break;
    case 'slide':
      initSlideNew(setting)
    break;
    case 'DEMO1':
    case 'DEMO2':
    case 'DEMO3':
    case 'DEMO4':
    case 'DEMO5':
    case 'DEMO6':
      initSheetByDemoNew(content,setting)
      break;

    default:
      break;
  }
}

export function initSheetNew(setting) {
  const {toolbar,refs} = setting
let cellData = {}

  cellData = {
    0: {
      0: {
        m: '',
        v: ''
      }
    }
  }


const { univerSheetCustom, CommonPluginData } = UniverPreactTs
const { DEFAULT_WORKBOOK_DATA } = CommonPluginData
const uiSheetsConfig = {
  container: refs,
  layout: {
    sheetContainerConfig: {
      infoBar: false,
      formulaBar: false,
      toolbar,
      sheetBar: false,
      countBar: false,
      rightMenu: false
    }
  },
}

const baseSheetsConfig = {
  selections: {
    'sheet-01': [
      {
        selection: {
          startRow: 0,
          endRow: 1,
          startColumn: 0,
          endColumn: 1
        },
        cell: {
          row: 0,
          column: 0
        }
      }
    ]
  }
}

let columnCount = 13
if (window.innerWidth < 1366) {
  columnCount = 7
}
const config = {
  id: makeid(6),
  styles: null,
  namedRanges: null,
  sheetOrder: [],
  sheets: {
    'sheet-01': {
      type: 0,
      id: 'sheet-01',
      name: 'sheet1',
      columnCount,
      status: 1,
      cellData
    }
  }
}
const coreConfig = Object.assign({}, DEFAULT_WORKBOOK_DATA, config)

univerSheetCustom({
  coreConfig,
  uiSheetsConfig,
  baseSheetsConfig
})
}
export function initSheetByDemoNew(demo,setting) {
  const {toolbar,refs} = setting
const { univerSheetCustom, CommonPluginData, UniverCore } = UniverPreactTs
const {
  DEFAULT_WORKBOOK_DATA_DEMO1,
  DEFAULT_WORKBOOK_DATA_DEMO2,
  DEFAULT_WORKBOOK_DATA_DEMO3,
  DEFAULT_WORKBOOK_DATA_DEMO4,
  DEFAULT_WORKBOOK_DATA_DEMO5,
  DEFAULT_WORKBOOK_DATA_DEMO6
} = CommonPluginData

const demoInfo = {
  DEMO1: DEFAULT_WORKBOOK_DATA_DEMO1,
  DEMO2: DEFAULT_WORKBOOK_DATA_DEMO2,
  DEMO3: DEFAULT_WORKBOOK_DATA_DEMO3,
  DEMO4: DEFAULT_WORKBOOK_DATA_DEMO4,
  DEMO5: DEFAULT_WORKBOOK_DATA_DEMO5,
  DEMO6: DEFAULT_WORKBOOK_DATA_DEMO6
}
const uiSheetsConfig = {
  container: refs,
  layout: {
    sheetContainerConfig: {
      infoBar: false,
      formulaBar: false,
      toolbar,
      sheetBar: false,
      countBar: false,
      rightMenu: false
    }
  }
}
const baseSheetsConfig = {
  selections: {
    'sheet-01': [
      {
        selection: {
          startRow: 11,
          endRow: 11,
          startColumn: 1,
          endColumn:1
        },
        cell: {
          row: 11,
          column: 1
        }
      }
    ]
  }
}

const coreConfig = UniverCore.Tools.deepClone(demoInfo[demo])

coreConfig.id = makeid(6)
coreConfig.sheetOrder = []
univerSheetCustom({
  coreConfig,
  uiSheetsConfig,
  baseSheetsConfig
})
}
export function initDocNew(setting) {
  const {toolbar,refs} = setting
const { univerDocCustom, UniverCore, CommonPluginData } = UniverPreactTs

const { DEFAULT_DOCUMENT_DATA_EN } = CommonPluginData

const coreConfig = UniverCore.Tools.deepClone(DEFAULT_DOCUMENT_DATA_EN)
coreConfig.id = makeid(6)

const uiDocsConfig = {
  container: refs,
  layout: {
    docContainerConfig: {
      innerRight: false,
      outerLeft: false,
      infoBar: false,
      toolbar
    }
  },
}
univerDocCustom({
  coreConfig,
  uiDocsConfig
})
}
export function initSlideNew(setting) {
  const {toolbar,refs} = setting
const { univerSlideCustom, UniverCore, CommonPluginData } = UniverPreactTs
const { DEFAULT_SLIDE_DATA } = CommonPluginData

const coreConfig = UniverCore.Tools.deepClone(DEFAULT_SLIDE_DATA)
coreConfig.id = makeid(6)

const uiSlidesConfig = {
  container: refs,
  layout: {
    slideContainerConfig: {
      innerLeft: false,
      innerRight: false,
      outerLeft: false,
      infoBar: false,
      toolbar
    }
  },
}
univerSlideCustom({
  coreConfig,
  uiSlidesConfig
})
}