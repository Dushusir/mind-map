<template>
  <div class="sheet-viewer">
    <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%"
      top="2%"
      :before-close="handleClose"
    >
      <div id="univer-demo" class='univer-demo' ref="sheetContainer">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {makeid} from '@/utils'
export default {
  name: 'SheetViewer',
  props: {
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {
    this.$bus.$on('openUniver', content => {
      console.log(content)
      this.dialogVisible = true;
      setTimeout(() => {
          this.init(content)
      }, 300);
    })
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    init(content){
        switch (content) {
        case 'sheet':
          this.initSheet()
          break;
        case 'doc':
          this.initDoc()
          break;
        case 'slide':
          this.initSlide()
          break;
        case 'DEMO1':
        case 'DEMO2':
        case 'DEMO3':
        case 'DEMO4':
          this.initSheetByDemo(content)
          break;

        default:
          break;
      }
    },
    initSheet(tableHTML) {
      let cellData = {}
      if (tableHTML) {
        const { BaseComponent } = UniverPreactTs
        const { handelTableToJson } = BaseComponent
        const array = handelTableToJson(tableHTML)

        array.forEach((row, i) => {
          cellData[i] = {}
          row.forEach((column, j) => {
            cellData[i][j] = column
          })
        })
      } else {
        cellData = {
          0: {
            0: {
              m: '',
              v: ''
            }
          }
        }
      }

      const { univerSheetCustom, CommonPluginData } = UniverPreactTs
      const { DEFAULT_WORKBOOK_DATA } = CommonPluginData
      const sheetConfig = {
        container: this.$refs.sheetContainer,
        layout: {
          sheetContainerConfig: {
            infoBar: false,
            formulaBar: false,
            toolBar: true,
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
    },
    initSheetByDemo(demo) {
      const { univerSheetCustom, CommonPluginData, UniverCore } = UniverPreactTs
      const {
        DEFAULT_WORKBOOK_DATA_DEMO1,
        DEFAULT_WORKBOOK_DATA_DEMO2,
        DEFAULT_WORKBOOK_DATA_DEMO3,
        DEFAULT_WORKBOOK_DATA_DEMO4
      } = CommonPluginData

      const demoInfo = {
        DEMO1: DEFAULT_WORKBOOK_DATA_DEMO1,
        DEMO2: DEFAULT_WORKBOOK_DATA_DEMO2,
        DEMO3: DEFAULT_WORKBOOK_DATA_DEMO3,
        DEMO4: DEFAULT_WORKBOOK_DATA_DEMO4
      }
      const sheetConfig = {
        container: this.$refs.sheetContainer,
        layout: {
          sheetContainerConfig: {
            infoBar: false,
            formulaBar: false,
            toolBar: true,
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
    },
    initDoc() {
      const { univerDocCustom, UniverCore, CommonPluginData } = UniverPreactTs

      const { DEFAULT_DOCUMENT_DATA_EN } = CommonPluginData

      const coreConfig = UniverCore.Tools.deepClone(DEFAULT_DOCUMENT_DATA_EN)
      coreConfig.id = makeid(6)

      const docConfig = {
        container: this.$refs.sheetContainer,
        layout: {
          innerRight: false,
          outerLeft: false,
          infoBar: false,
          toolBar: true
        }
      }
      univerDocCustom({
        coreConfig,
        baseDocsConfig: docConfig
      })
    },
    initSlide() {
      const { univerSlideCustom, UniverCore, CommonPluginData } = UniverPreactTs
      const { DEFAULT_SLIDE_DATA } = CommonPluginData

      const coreConfig = UniverCore.Tools.deepClone(DEFAULT_SLIDE_DATA)
      coreConfig.id = makeid(6)

      const slideConfig = {
        container: this.$refs.sheetContainer,
        layout: {
          innerLeft: false,
          innerRight: false,
          outerLeft: false,
          infoBar: false,
          toolBar: true
        }
      }
      univerSlideCustom({
        coreConfig,
        baseSlidesConfig: slideConfig
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sheet-viewer {
    .univer-demo{
    width: 100%;
    height: 70vh;
    }
    
}


</style>
