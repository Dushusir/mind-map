<template>
  <div class="sheet-viewer">

    <!-- <div class="mini-sheet">
        <div id="univer-demo" class='univer-demo' ref="miniSheetContainer"></div>
         <el-button type="text" @click.stop="openUniver" class="full-btn el-icon-full-screen"
      ></el-button>
    </div> -->

    <div
      title="Univer"
      class="univer-dialog-container"
      :style="{display: dialogVisible ? 'block' : 'none' }"
    >
    <div class="univer-dialog">
      <div id="univer-demo" class='univer-demo' ref="sheetContainer" :key="key">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('toolbar.cancel')}}</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >{{$t('toolbar.confirm')}}</el-button
        >
      </span>
    </div>

    </div>
  </div>
</template>

<script>
import {makeid,initUniver,initUniverNew} from '@/utils'
export default {
  name: 'SheetViewer',
  props: {
    content:String,
    width:Number,
    height:Number,
  },
  data() {
    return {
      key: '',
      dialogVisible: false
    }
  },
  created() {
    this.$bus.$on('openUniver', (content,univerid) => {
      // this.dialogVisible = true
      content = content || "DEMO1"
      console.log(content)
      this.key = content;
      setTimeout(() => {
         let config = {
              toolbar:true,
              refs:this.$refs.sheetContainer 
          }

          if(content === 'slide'){
            config.innerLeft = true
          }

          const container = document.querySelector(`[data-univerid="${univerid}"]`);
          this.setFullscreenContainer(container)
          // initUniverNew(content,config)
          // initUniver(content,{
          //       toolBar:true,
          //       refs:this.$refs.sheetContainer
          //   })
      }, 100);
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
    setFullscreenContainer(container) {
            // const container = con.cloneNode(true)
      const foreignObject = container.parentNode
      document.body.appendChild(container)

      // const btnFullscreen = container.querySelector('.btn-fullscreen')
      // container.style.width = window.innerWidth + 'px'
      // container.style.height = window.innerHeight + 'px'
      // container.style.position = 'fixed'
      // container.style.left = '100px'
      // container.style.top = '100px'
      container.classList.add('activeUniver')
      

      // container.style.zIndex = 10000
      var myEvent = new Event('resize'); window.dispatchEvent(myEvent)
      // btnFullscreen.style.display = 'none' 

      let header = container.querySelector('.dialog-header')
      if(!header){
        const dialogButtons = `<div class="dialog-header">
          <h3 class="dialog-title">Univer</h3>
          <button id="close-dialog" class="close-dialog-btn">×</button>
        </div>
        
        <div class="dialog-footer">
          <button id="cancel-btn" class="dialog-btn">取消</button>
          <button id="confirm-btn" class="dialog-btn">确认</button>
        </div>`

        container.insertAdjacentHTML('beforeend',dialogButtons);

        let closeButton = container.querySelector('.close-dialog-btn')
        let confirms= container.querySelectorAll('.dialog-btn')
        let buttonList = Array.from(confirms).concat(closeButton)
        buttonList.forEach((button)=>{
          button.addEventListener('click',()=>{
            this.setBackFullscreenContainer(container,foreignObject)
          })
        })
      }

      
    },
    setBackFullscreenContainer(container,foreignObject) {
      foreignObject.appendChild(container)
      // const container = document.querySelector('.activeUniver');

      // if (!container) return

      // const btnFullscreen = container.querySelector('.btn-fullscreen')

      // container.style.width = '100%'
      // container.style.height = '360px'
      // container.style.position = 'unset'
      // container.style.left = 'unset'
      // container.style.top = 'unset'
      container.classList.remove('activeUniver')

      // container.style.zIndex = 'unset'
      const myEvent = new Event('resize'); window.dispatchEvent(myEvent)
      // btnFullscreen.style.display = 'block'
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogVisible = false;
        })
        .catch(_ => {})
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
    .univer-dialog-container{
      position: fixed;
      top:0;
      left:0;
      width:100%;
      height: 100%;
      background: rgba(0,0,0,0.5);

      .univer-dialog{
        position: absolute;
        top:10%;
        left:5%;
        width:90%;
        height: 80%;
        background: white;

        .dialog-footer{
              height: 100px;
              display: block;
              text-align: right;
              margin: 30px;
        }
      }
    }
    .univer-demo{
    width: 100%;
    height: 70vh;

    }

}


</style>
