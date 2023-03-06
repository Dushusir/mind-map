<template>
  <div class="sheet-viewer">

    <!-- <div class="mini-sheet">
        <div id="univer-demo" class='univer-demo' ref="miniSheetContainer"></div>
         <el-button type="text" @click.stop="openUniver" class="full-btn el-icon-full-screen"
      ></el-button>
    </div> -->
   
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
import {makeid,initUniver} from '@/utils'
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
    this.$bus.$on('openUniver', (content) => {
      this.dialogVisible = true
      content = content || "DEMO1"
      setTimeout(() => {
          initUniver(content,{
                toolBar:true,
                refs:this.$refs.sheetContainer
            })
      }, 300);
    })
  },
  mounted(){
    // const content = this.content || "DEMO2"
    // const width = this.width || 300;
    // const height = this.height || 150;

    // this.$refs.miniSheetContainer.style.width = width + 'px'
    // this.$refs.miniSheetContainer.style.height = height + 'px'
    // this.init(content,{
    //     toolBar:false,
    //     refs:this.$refs.miniSheetContainer
    // })
    //  initUnive(content,{
    //             toolBar:true,
    //             refs:this.$refs.sheetContainer
    //         })

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
        const content = this.content || "DEMO1"
        this.dialogVisible = true;
        setTimeout(() => {
            initUnive(content,{
                toolBar:true,
                refs:this.$refs.sheetContainer
            })
        }, 300);
    },
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
