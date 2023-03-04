<template>
  <div class="sheet-viewer">

    <div class="mini-sheet">
        <div id="univer-demo" class='univer-demo' ref="miniSheetContainer"></div>
         <el-button type="text" @click.stop="openUniver" class="full-btn el-icon-full-screen"
      ></el-button>
    </div>
   
    <el-dialog
      title="Univer"
      :visible="dialogVisible"
      width="80%"
      top="2%"
      :before-close="handleClose"
    >
      <div id="univer-demo" class='univer-demo' ref="sheetContainer">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('toolbar.cancel')}}</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >{{$t('toolbar.confirm')}}</el-button
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
    content:String,
    width:Number,
    height:Number,
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {
    
  },
  mounted(){
    const content = this.content || "DEMO2"
    const width = this.width || 300;
    const height = this.height || 150;

    this.$refs.miniSheetContainer.style.width = width + 'px'
    this.$refs.miniSheetContainer.style.height = height + 'px'
    this.init(content,{
        toolBar:false,
        refs:this.$refs.miniSheetContainer
    })

  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogVisible = false;
        })
        .catch(_ => {})
    },

    openUniver(){
        const content = this.content || "DEMO2"
        this.dialogVisible = true;
        setTimeout(() => {
            this.init(content,{
                toolBar:true,
                refs:this.$refs.sheetContainer
            })
        }, 300);
    },

    init(content,setting){
        switch (content) {
        case 'sheet':
          this.initSheet(setting)
          break;
        case 'doc':
          this.initDoc(setting)
          break;
        case 'slide':
          this.initSlide(setting)
          break;
        case 'DEMO1':
        case 'DEMO2':
        case 'DEMO3':
        case 'DEMO4':
          this.initSheetByDemo(content,setting)
          break;

        default:
          break;
      }
    },
    initSheet(setting) {
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
    },
    initSheetByDemo(demo,setting) {
        const {toolBar,refs} = setting
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
    },
    initDoc(setting) {
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
    },
    initSlide(setting) {
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
  }

}
</script>

<style lang="less" scoped>
.sheet-viewer {
    .mini-sheet{
        background: red;
        position: relative;

        .full-btn{
            position: absolute;
            right:4px;
            top:1px;
        }
    }
    .univer-demo{
    width: 100%;
    height: 70vh;
    }
    
}


</style>
