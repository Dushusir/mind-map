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

const ipAddress = '47.100.177.253:8500'
export const urlCollbaration = 'http://luckysheet.lashuju.com/univer/'
const univer_config = {"type":"sheet","template":"DEMO1"}

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
  sheetOrder: ['sheet-01'],
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
coreConfig.sheetOrder = ['sheet-01']
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

function refresh(params) {
  const rootEle = document.querySelector('.mindMapContainer');
  if (!rootEle) return;

  var config = {
    childList: true,
    subtree: true,
  };
  var time = null;
  new MutationObserver(() => {
    if (time) {
      clearTimeout(time);
      time = null;
    }

    time = setTimeout(() => {
      console.log('refresh')
      window.dispatchEvent(new Event('resize', {}));
    }, 500);
  }).observe(rootEle, config);
}
export function initUniverNew(content,setting) {

  refresh()

  // paste history
  if(setting.univerId){
    return initSheetByDemoNew(content, setting)
  }
  else if(content.indexOf('<table') > -1 && content.indexOf('<td') > -1){
    setting.isPasteSheet = true
    return initSheetNew(content, setting)
  }
  // handle http://luckysheet.lashuju.com/univer/?id=nxt0kDHPz3
  else if(content.indexOf('luckysheet.lashuju.com/univer/?id=') !== -1){
    const univerId = content.split('?id=')[1];
    setting.univerId = univerId
    return initSheetByDemoNew(content, setting)
  }
  switch (content) {
    case 'sheet':
      return initSheetNew(content,setting)
    case 'doc':
      return initDocNew(setting)
    case 'slide':
      return initSlideNew(setting)
    case 'DEMO1':
    case 'DEMO2':
    case 'DEMO3':
    case 'DEMO4':
    case 'DEMO5':
    case 'DEMO6':
    case 'DEMO7':
    case 'DEMO8':
      return initSheetByDemoNew(content,setting)
    default:
      break;
  }
}

export function initSheetNew(tableHTML,setting) {
  const {toolbar,refs,isPasteSheet,univerId,success: cb} = setting
let cellData = {}
let mergeData = {}
let rowData = []
let columnData = []

if (isPasteSheet) {
  const { BaseComponent } = UniverPreactTs
  const { handelTableToJson, handleTableColgroup, handleTableRowGroup, handleTableMergeData,handelExcelToJson,handlePlainToJson } = BaseComponent
  // const data = handelTableToJson(tableHTML)
  // const colInfo = handleTableColgroup(tableHTML);
  // const rowInfo = handleTableRowGroup(tableHTML);

  let data;
  let colInfo;
  let rowInfo;
  if (tableHTML) {
      if (tableHTML.indexOf('xmlns:x="urn:schemas-microsoft-com:office:excel"') > -1) {
          data = handelExcelToJson(tableHTML);
          colInfo = handleTableColgroup(tableHTML);
          rowInfo = handleTableRowGroup(tableHTML);
      } else if (tableHTML.indexOf('<table') > -1 && tableHTML.indexOf('<td') > -1) {
          data = handelTableToJson(tableHTML);
          colInfo = handleTableColgroup(tableHTML);
          rowInfo = handleTableRowGroup(tableHTML);
      } else {
          data = handlePlainToJson(tableHTML);
      }
  }

  columnData = colInfo.map(w => {
      return { w }
  })
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
  sheetOrder: ['sheet-01'],
  sheets: {
    'sheet-01': {
      type: 0,
      id: 'sheet-01',
      name: 'sheet1',
      // columnCount,
      status: 1,
      cellData,
      freezeColumn: 1,
      rowCount: 1000,
      columnCount: 20,
      freezeRow: 1,
      zoomRatio: 1,
      scrollTop: 200,
      scrollLeft: 100,
      defaultColumnWidth: 93,
      defaultRowHeight: 27,
      showGridlines: 1,
      rowTitle: {
        width: 46,
          hidden: 0,
      },
      columnTitle: {
          height: 20,
          hidden: 0,
      },
    }
  }
}

if(isPasteSheet){
  config.sheets['sheet-01'].mergeData = mergeData;
  config.sheets['sheet-01'].rowData = rowData;
  config.sheets['sheet-01'].columnData = columnData;
  config.sheets['sheet-01'].rowCount = 1000
  config.sheets['sheet-01'].columnCount = 20
}

const coreConfig = Object.assign({}, DEFAULT_WORKBOOK_DATA, config)

// 协同
newDocs('http://'+ipAddress+'/new',univer_config,(json)=>{

  // offline
  if(json == null){
    const universheet = univerSheetCustom({
      coreConfig,
      uiSheetsConfig,
      baseSheetsConfig
    })
  
    cb && cb(universheet)

    return
  }


  const id = json.id;
  const config = json.config;

  if(config === 'default'){

    updateDocs(id,coreConfig,()=>{
      const universheet = univerSheetCustom({
        univerConfig:{
            id
        },
        coreConfig,
        uiSheetsConfig,
        baseSheetsConfig,
        collaborationConfig:{
          url: `${'ws://'+ipAddress+'/ws/'}${id}`
      }
      })
    
      cb && cb(universheet)
    })
  }
  
})


// univerSheetCustom({
//   coreConfig,
//   uiSheetsConfig,
//   baseSheetsConfig
// })
}
export function initSheetByDemoNew(demo,setting) {
  const {toolbar,refs,univerId,success: cb} = setting
const { univerSheetCustom, CommonPluginData, UniverCore } = UniverPreactTs

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

if(univerId){
  openDocs(univerId,(json)=>{
    const universheetconfig = json.config;
    const id = json.id;

    const universheet = univerSheetCustom({
        univerConfig:{
            id
        },
        coreConfig:JSON.parse(universheetconfig),
        uiSheetsConfig,
        collaborationConfig:{
            url: `${'ws://'+ipAddress+'/ws/'}${id}`
        }
    });

    cb && cb(universheet)

})

return
}

const {
  DEFAULT_WORKBOOK_DATA_DEMO1,
  DEFAULT_WORKBOOK_DATA_DEMO2,
  DEFAULT_WORKBOOK_DATA_DEMO3,
  DEFAULT_WORKBOOK_DATA_DEMO4,
  DEFAULT_WORKBOOK_DATA_DEMO5,
  DEFAULT_WORKBOOK_DATA_DEMO6,
  DEFAULT_WORKBOOK_DATA_DEMO7,
  DEFAULT_WORKBOOK_DATA_DEMO8
} = CommonPluginData

const demoInfo = {
  DEMO1: DEFAULT_WORKBOOK_DATA_DEMO1,
  DEMO2: DEFAULT_WORKBOOK_DATA_DEMO2,
  DEMO3: DEFAULT_WORKBOOK_DATA_DEMO3,
  DEMO4: DEFAULT_WORKBOOK_DATA_DEMO4,
  DEMO5: DEFAULT_WORKBOOK_DATA_DEMO5,
  DEMO6: DEFAULT_WORKBOOK_DATA_DEMO6,
  DEMO7: DEFAULT_WORKBOOK_DATA_DEMO7,
  DEMO8: DEFAULT_WORKBOOK_DATA_DEMO8,
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


newDocs('http://'+ipAddress+'/new',univer_config,(json)=>{

  // offline
  if(json == null){
    const universheet = univerSheetCustom({
      coreConfig,
      uiSheetsConfig,
      baseSheetsConfig
    })
  
    cb && cb(universheet)

    return
  }


  const id = json.id;
  const config = json.config;

  if(config === 'default'){

    updateDocs(id,coreConfig,()=>{
      const universheet = univerSheetCustom({
        univerConfig:{
            id
        },
        coreConfig,
        uiSheetsConfig,
        baseSheetsConfig,
        collaborationConfig:{
          url: `${'ws://'+ipAddress+'/ws/'}${id}`
      }
      })
    
      cb && cb(universheet)
    })
  }
  
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

export function execCommandPaste(text) {
  let input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.left = '0px';
  input.style.top = '-99999px';
  document.body.append(input);
  input.focus();
  input.value = text;
  input.selectionStart = 0;
  input.selectionEnd = input.value.length;
  document.execCommand('copy');
  document.body.removeChild(input);
}

export function readExcelCopyData(e, success) {
  let clipboardData = e.clipboardData;
  let handel = 0;
  let count = 0;
  let result = new Map();
  let items = clipboardData.items;
  let callback = (type, data) => {
    result[type] = data;
    if (count === handel) {
      success(result);
    }
  }
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (item.kind === 'string' && item.type === 'text/plain') {
      // 处理剪贴板中的纯文本数据
      item.getAsString((data) => {
        count++;
        console.log('text data:', data);
        callback('text', data);
      });
      handel++;
    } else if (item.kind === 'string' && item.type === 'text/html') {
      // 处理剪贴板中的 HTML 数据
      item.getAsString((data) => {
        count++;
        console.log('html data:', data);
        callback('html',data);
      });
      handel++;
    } else if (item.kind === 'file' && item.type === 'application/vnd.ms-excel') {
      // 处理剪贴板中的 Excel 文件数据
      let file = item.getAsFile();
      console.log('excel file:', file);
      let reader = new FileReader();
      reader.onload = function(event) {
        count++;
        let data = event.target.result;
        console.log('excel data:', data);
        callback('file', data);
      };
      reader.readAsText(file);
      handel++;
    }
  }
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


// 协同

function newDocs(url, params, cb) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(document => {
      // 处理获取到的文档信息
      console.log(document);
      cb && cb(document)
    })
    .catch(error => {
      console.error(error);
      cb(null)
    }); 

}


function openDocs(id,cb) {
  // 定义请求参数
      const data = new FormData();
      data.append('id', id);

      // 创建 XMLHttpRequest 对象
      const xhr = new XMLHttpRequest();

      // 监听请求完成事件
      xhr.onload = function() {
      if (xhr.status === 200) {
          const document = JSON.parse(xhr.responseText);
          // 处理获取到的文档信息
          console.log(document);
          cb && cb(document)
      } else {
          console.error(xhr.statusText);
      }
      };

      // 发送 POST 请求
      xhr.open('POST', 'http://'+ipAddress+'/open', true);
      xhr.send(data);

}
function updateDocs(id,config,cb) {
  // 定义请求参数
      const data = new FormData();
      data.append('id', id);
      data.append('config', JSON.stringify(config));

      // 创建 XMLHttpRequest 对象
      const xhr = new XMLHttpRequest();

      // 监听请求完成事件
      xhr.onload = function() {
      if (xhr.status === 200) {
          const document = JSON.parse(xhr.responseText);
          // 处理获取到的文档信息
          console.log(document);
          cb && cb(document)
      } else {
          console.error(xhr.statusText);
      }
      };

      // 发送 POST 请求
      xhr.open('POST', 'http://'+ipAddress+'/update', true);
      xhr.send(data);

}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
if (!navigator.clipboard) {
  fallbackCopyTextToClipboard(text);
  return;
}
navigator.clipboard.writeText(text).then(function() {
  console.log('Async: Copying to clipboard was successful!');
}, function(err) {
  console.error('Async: Could not copy text: ', err);
});
}

export function getUniverId(id) {
  let cacheUniverId = localStorage.getItem('cacheUniverId');

  if(cacheUniverId && cacheUniverId !== '{}'){
    cacheUniverId = JSON.parse(cacheUniverId)
    return cacheUniverId[id]
  }

  return null
  
}
export function setUniverId(id,univerId) {

  let cacheUniverId = localStorage.getItem('cacheUniverId');

  if(!cacheUniverId){
    cacheUniverId = '{}'
  }


  cacheUniverId = JSON.parse(cacheUniverId)
  cacheUniverId[id] = univerId

  cacheUniverId = JSON.stringify(cacheUniverId)

  localStorage.setItem('cacheUniverId',cacheUniverId);
  
}