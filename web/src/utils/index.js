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
  if(content.indexOf('universheet') !== -1){
    setting.isPasteSheet = true
    return initSheetNew(content, setting)
  }
  switch (content) {
    case 'sheet':
      initSheetNew(content,setting)
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

export function initSheetNew(tableHTML,setting) {
  const {toolbar,refs,isPasteSheet} = setting
let cellData = {}
let mergeData = {}
let rowData = []
let columnData = []

if (isPasteSheet) {
  const { BaseComponent } = UniverPreactTs
  const { handelTableToJson, handleTableColgroup, handleTableRowGroup, handleTableMergeData } = BaseComponent
  const data = handelTableToJson(tableHTML)
  const colInfo = handleTableColgroup(tableHTML);
  columnData = colInfo.map(w => {
      return { w }
  })
  const rowInfo = handleTableRowGroup(tableHTML);
  rowData = rowInfo.map(h => {
      return { h }
  })

  const tableData = handleTableMergeData(data);
  mergeData = tableData.mergeData;

  data.forEach((row, i) => {
      cellData[i] = {}
      row.forEach((column, j) => {
          cellData[i][j] = column
      })
  })
} else {
  cellData = {
      '0': {
          '0': {
              m: '',
              v: ''
          }
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
      // columnCount,
      status: 1,
      cellData
    }
  }
}

if(isPasteSheet){
  config.sheets['sheet-01'].mergeData = mergeData;
  config.sheets['sheet-01'].rowData = rowData;
  config.sheets['sheet-01'].columnData = columnData;
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
  const {toolbar,refs,innerLeft = false} = setting
const { univerSlideCustom, UniverCore, CommonPluginData } = UniverPreactTs
const { DEFAULT_SLIDE_DATA } = CommonPluginData

const coreConfig = UniverCore.Tools.deepClone(DEFAULT_SLIDE_DATA)
coreConfig.id = makeid(6)

const uiSlidesConfig = {
  container: refs,
  layout: {
    slideContainerConfig: {
      innerLeft,
      innerRight: false,
      outerLeft: false,
      infoBar: false,
      toolbar
    }
  },
}
const universlide = univerSlideCustom({
  coreConfig,
  uiSlidesConfig
})

setTimeout(() => {

  universlide._context.getPluginManager().getPluginByName('slide').getCanvasView().scrollToCenter()
}, 0);
}

export function stopImmediatePropagation(container) {
  container && container.addEventListener('wheel', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('click', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('drag', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('mousedown', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('mousemove', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('keydown', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('keyup', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('cut', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('copy', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('paste', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('compositionstart', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('compositionupdate', (e) => {
      e.stopImmediatePropagation()
  });
  container && container.addEventListener('compositionend', (e) => {
      e.stopImmediatePropagation()
  });
}