<template>
  <div
      class="richTextToolbar"
      ref="richTextToolbar"
      :style="style"
      @click.stop.passive
      v-show="showRichTextToolbar">
    <el-tooltip content="加粗" placement="top">
      <div class="btn" :class="{ active: formatInfo.bold }" @click="toggleBold">
        <span class="icon iconfont iconzitijiacu"></span>
      </div>
    </el-tooltip>

    <el-tooltip content="斜体" placement="top">
      <div
          class="btn"
          :class="{ active: formatInfo.italic }"
          @click="toggleItalic"
      >
        <span class="icon iconfont iconzitixieti"></span>
      </div>
    </el-tooltip>

    <el-tooltip content="下划线" placement="top">
      <div
          class="btn"
          :class="{ active: formatInfo.underline }"
          @click="toggleUnderline"
      >
        <span class="icon iconfont iconzitixiahuaxian"></span>
      </div>
    </el-tooltip>

    <el-tooltip content="删除线" placement="top">
      <div
          class="btn"
          :class="{ active: formatInfo.strike }"
          @click="toggleStrike"
      >
        <span class="icon iconfont iconshanchuxian"></span>
      </div>
    </el-tooltip>

    <el-tooltip content="字体" placement="top">
      <el-popover placement="bottom" trigger="hover">
        <div class="fontOptionsList">
          <div
              class="fontOptionItem"
              v-for="item in fontFamilyList"
              :key="item.value"
              :style="{ fontFamily: item.value }"
              :class="{ active: formatInfo.font === item.value }"
              @click="changeFontFamily(item.value)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="btn" slot="reference">
          <span class="icon iconfont iconxingzhuang-wenzi"></span>
        </div>
      </el-popover>
    </el-tooltip>

    <el-tooltip content="字号" placement="top">
      <el-popover placement="bottom" trigger="hover">
        <div class="fontOptionsList">
          <div
              class="fontOptionItem"
              v-for="item in fontSizeList"
              :key="item"
              :style="{ fontSize: item + 'px' }"
              :class="{ active: formatInfo.size === item + 'px' }"
              @click="changeFontSize(item)"
          >
            {{ item }}px
          </div>
        </div>
        <div class="btn" slot="reference" :style="{ color: formatInfo.color }">
          <span class="icon iconfont iconcase fontColor"></span>
        </div>
      </el-popover>
    </el-tooltip>

    <el-tooltip content="字体颜色" placement="top">
      <el-popover placement="bottom" trigger="hover">
        <Color :color="fontColor" @change="changeFontColor"></Color>
        <div class="btn" slot="reference">
          <span class="icon iconfont iconzitiyanse"></span>
        </div>
      </el-popover>
    </el-tooltip>

    <el-tooltip content="背景颜色" placement="top">
      <el-popover placement="bottom" trigger="hover">
        <Color :color="fontBackgroundColor" @change="changeFontBackgroundColor"></Color>
        <div class="btn" slot="reference">
          <span class="icon iconfont iconbeijingyanse"></span>
        </div>
      </el-popover>
    </el-tooltip>

    <el-tooltip content="清除样式" placement="top">
      <div class="btn" @click="removeFormat">
        <span class="icon iconfont iconqingchu"></span>
      </div>
    </el-tooltip>

    <el-tooltip content="工作" placement="top">
      <div class="btn univerTooltip" @click="univerDemo6">
        <span>工作</span>
      </div>
    </el-tooltip>
    <el-tooltip content="计划" placement="top">
      <div class="btn univerTooltip" @click="univerDemo5">
        <span>计划</span>
      </div>
    </el-tooltip>
    <el-tooltip content="订单" placement="top">
      <div class="btn univerTooltip" @click="univerDemo1">
        <span>订单</span>
      </div>
    </el-tooltip>

    <el-tooltip content="日历" placement="top">
      <div class="btn univerTooltip" @click="univerDemo2">
        <span>日历</span>
      </div>
    </el-tooltip>

    <el-tooltip content="甘特图" placement="top">
      <div class="btn univerTooltip" @click="univerDemo3">
        <span>甘特图</span>
      </div>
    </el-tooltip>

    <el-tooltip content="单据" placement="top">
      <div class="btn univerTooltip" @click="univerDemo4">
        <span>单据</span>
      </div>
    </el-tooltip>

    <el-tooltip content="表格" placement="top">
      <div class="btn univerTooltip" @click="univerSheet">
        <span>表格</span>
      </div>
    </el-tooltip>

    <el-tooltip content="文档" placement="top">
      <div class="btn univerTooltip" @click="univerDoc">
        <span>文档</span>
      </div>
    </el-tooltip>

    <el-tooltip content="演示文稿" placement="top">
      <div class="btn univerTooltip" @click="univerSlide">
        <span>演示文稿</span>
      </div>
    </el-tooltip>

    <el-tooltip content="Demo7" placement="top">
      <div class="btn univerTooltip" @click="univerDemo7">
        <span>Demo7</span>
      </div>
    </el-tooltip>

    <el-tooltip content="Demo8" placement="top">
      <div class="btn univerTooltip" @click="univerDemo8">
        <span>Demo8</span>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import {fontFamilyList, fontSizeList} from '@/config'
import Color from './Color'
import {ComponentFactory} from "simple-mind-map";
import {
  makeid,
  initUniverNew,
  stopImmediatePropagation,
  readExcelCopyData,
  execCommandPaste,
  getUniverId,
  setUniverId,
  urlCollbaration
} from '@/utils'

const cache = {};
ComponentFactory.register.set('demo1', function (id, obj) {
  console.log(id)
  if (cache[id]) {
    return cache[id];
  }

  const div = document.createElement('div');
  const univerid = makeid(6)

  div.id = "univer-demo";
  div.setAttribute("data-univerid", univerid)
  div.classList.add("univer-demo");
  div.style.width = '400px';
  div.style.height = '225px';

  let demo = obj && obj.attr && typeof obj.attr === 'string' ? obj.attr : "DEMO1"
  setTimeout(() => {
    const foreignObject = div.parentNode;
    if (foreignObject) {
      foreignObject.id = univerid;
    }
    // const container = document.querySelector(`[data-univerid="${univerid}"]`);
    const container = div;

    stopImmediatePropagation(container)

    let univerSheet = null
    let univerId = null
    initUniverNew(demo, {
      toolbar: false,
      refs: container,
      univerId: getUniverId(id),
      success: (universheet) => {
        univerSheet = universheet
        univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
        setUniverId(id, univerId)
      }
    },)
    // initUniver(demo, {
    //   toolBar: false,
    //   refs: container
    // })
    container.insertAdjacentHTML('afterbegin', '<button class="select-fullscreen">复制</button>');
    container.insertAdjacentHTML('afterbegin', '<span class="btn-fullscreen el-icon-full-screen"></span>');
    const btnFullscreen = container.querySelector('.btn-fullscreen');
    const selFullscreen = container.querySelector('.select-fullscreen');
    selFullscreen.addEventListener('click', () => {
      // const univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();

      // obj.univerId = univerId
      const url = urlCollbaration + '?id=' + univerId;
      execCommandPaste(url);
      Vue.prototype.$message({
        showClose: true,
        message: 'Copy Success'
      });
    });
    btnFullscreen.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      Vue.prototype.$bus.$emit('openUniver', demo, univerid)
    });
  }, 100);
  return cache[id] = div;
});
ComponentFactory.register.set('demo2', function (id, obj) {
  console.log(id)
  if (cache[id]) {
    return cache[id];
  }

  const div = document.createElement('div');
  const univerid = makeid(6)

  div.id = "univer-demo";
  div.setAttribute("data-univerid", univerid)
  div.classList.add("univer-demo");
  div.style.width = '400px';
  div.style.height = '225px';

  let demo = "DEMO2"
  setTimeout(() => {
    const foreignObject = div.parentNode;
    if (foreignObject) {
      foreignObject.id = univerid;
    }
    // const container = document.querySelector(`[data-univerid="${univerid}"]`);
    const container = div;
    stopImmediatePropagation(container)
    let univerSheet = null
    let univerId = null
    initUniverNew(demo, {
      toolbar: false,
      refs: container,
      univerId: getUniverId(id),
      success: (universheet) => {
        univerSheet = universheet
        univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
        setUniverId(id, univerId)
      }
    })
    // initUniver(demo, {
    //   toolBar: false,
    //   refs: container
    // })
    container.insertAdjacentHTML('afterbegin', '<button class="select-fullscreen">复制</button>');
    container.insertAdjacentHTML('afterbegin', '<span class="btn-fullscreen el-icon-full-screen"></span>');
    const btnFullscreen = container.querySelector('.btn-fullscreen');
    const selFullscreen = container.querySelector('.select-fullscreen');
    btnFullscreen.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      Vue.prototype.$bus.$emit('openUniver', demo, univerid)
    })
    selFullscreen.addEventListener('click', () => {
      const url = urlCollbaration + '?id=' + univerId;
      execCommandPaste(url);
      Vue.prototype.$message({
        showClose: true,
        message: 'Copy Success'
      });
    });
  }, 100);
  return cache[id] = div;
});
ComponentFactory.register.set('demo3', function (id, obj) {
  if (cache[id]) {
    return cache[id];
  }

  const div = document.createElement('div');
  const univerid = makeid(6)

  div.id = "univer-demo";
  div.setAttribute("data-univerid", univerid)
  div.classList.add("univer-demo");
  div.style.width = '400px';
  div.style.height = '225px';

  let demo = "DEMO3"
  setTimeout(() => {
    const foreignObject = div.parentNode;
    if (foreignObject) {
      foreignObject.id = univerid;
    }
    // const container = document.querySelector(`[data-univerid="${univerid}"]`);
    const container = div;
    stopImmediatePropagation(container)
    let univerSheet = null
    let univerId = null
    initUniverNew(demo, {
      toolbar: false,
      refs: container,
      univerId: getUniverId(id),
      success: (universheet) => {
        univerSheet = universheet
        univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
        setUniverId(id, univerId)
      }
    },)
    // initUniver(demo, {
    //   toolBar: false,
    //   refs: container
    // })
    container.insertAdjacentHTML('afterbegin', '<button class="select-fullscreen">复制</button>');
    container.insertAdjacentHTML('afterbegin', '<span class="btn-fullscreen el-icon-full-screen"></span>');
    const btnFullscreen = container.querySelector('.btn-fullscreen');
    const selFullscreen = container.querySelector('.select-fullscreen');
    selFullscreen.addEventListener('click', () => {
      const url = urlCollbaration + '?id=' + univerId;
      execCommandPaste(url);
      Vue.prototype.$message({
        showClose: true,
        message: 'Copy Success'
      });
    });
    btnFullscreen.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      Vue.prototype.$bus.$emit('openUniver', demo, univerid)
    })
  }, 100);
  return cache[id] = div;
});
ComponentFactory.register.set('demo4', function (id, obj) {
  if (cache[id]) {
    return cache[id];
  }

  const div = document.createElement('div');
  const univerid = makeid(6)

  div.id = "univer-demo";
  div.setAttribute("data-univerid", univerid)
  div.classList.add("univer-demo");
  div.style.width = '400px';
  div.style.height = '225px';

  let demo = "DEMO4"
  setTimeout(() => {
    const foreignObject = div.parentNode;
    if (foreignObject) {
      foreignObject.id = univerid;
    }
    // const container = document.querySelector(`[data-univerid="${univerid}"]`);
    const container = div;
    stopImmediatePropagation(container)
    let univerSheet = null
    let univerId = null
    initUniverNew(demo, {
      toolbar: false,
      refs: container,
      univerId: getUniverId(id),
      success: (universheet) => {
        univerSheet = universheet
        univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
        setUniverId(id, univerId)
      }
    },)
    // initUniver(demo, {
    //   toolBar: false,
    //   refs: container
    // })
    container.insertAdjacentHTML('afterbegin', '<button class="select-fullscreen">复制</button>');
    container.insertAdjacentHTML('afterbegin', '<span class="btn-fullscreen el-icon-full-screen"></span>');
    const btnFullscreen = container.querySelector('.btn-fullscreen');
    const selFullscreen = container.querySelector('.select-fullscreen');
    selFullscreen.addEventListener('click', () => {
      const url = urlCollbaration + '?id=' + univerId;
      execCommandPaste(url);
      Vue.prototype.$message({
        showClose: true,
        message: 'Copy Success'
      });
    });
    btnFullscreen.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      Vue.prototype.$bus.$emit('openUniver', demo, univerid)
    })
  }, 100);
  return cache[id] = div;
});
ComponentFactory.register.set('demo5', function (id, obj) {
  if (cache[id]) {
    return cache[id];
  }

  const div = document.createElement('div');
  const univerid = makeid(6)

  div.id = "univer-demo";
  div.setAttribute("data-univerid", univerid)
  div.classList.add("univer-demo");
  div.style.width = '400px';
  div.style.height = '225px';

  let demo = "DEMO5"
  setTimeout(() => {
    const foreignObject = div.parentNode;
    if (foreignObject) {
      foreignObject.id = univerid;
    }
    const container = div;
    stopImmediatePropagation(container)
    let univerSheet = null
    let univerId = null
    initUniverNew(demo, {
      toolbar: false,
      refs: container,
      univerId: getUniverId(id),
      success: (universheet) => {
        univerSheet = universheet
        univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
        setUniverId(id, univerId)
      }
    },)
    container.insertAdjacentHTML('afterbegin', '<button class="select-fullscreen">复制</button>');
    container.insertAdjacentHTML('afterbegin', '<span class="btn-fullscreen el-icon-full-screen"></span>');
    const btnFullscreen = container.querySelector('.btn-fullscreen');
    const selFullscreen = container.querySelector('.select-fullscreen');
    selFullscreen.addEventListener('click', () => {
      const url = urlCollbaration + '?id=' + univerId;
      execCommandPaste(url);
      Vue.prototype.$message({
        showClose: true,
        message: 'Copy Success'
      });
    });
    btnFullscreen.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      Vue.prototype.$bus.$emit('openUniver', demo, univerid)
    })
  }, 100);
  return cache[id] = div;
});
ComponentFactory.register.set('demo6', function (id, obj) {
  if (cache[id]) {
    return cache[id];
  }

  const div = document.createElement('div');
  const univerid = makeid(6)

  div.id = "univer-demo";
  div.setAttribute("data-univerid", univerid)
  div.classList.add("univer-demo");
  div.style.width = '400px';
  div.style.height = '225px';

  let demo = "DEMO6"
  setTimeout(() => {
    const foreignObject = div.parentNode;
    if (foreignObject) {
      foreignObject.id = univerid;
    }
    const container = div;
    stopImmediatePropagation(container)
    let univerSheet = null
    let univerId = null
    initUniverNew(demo, {
      toolbar: false,
      refs: container,
      univerId: getUniverId(id),
      success: (universheet) => {
        univerSheet = universheet
        univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
        setUniverId(id, univerId)
      }
    },)
    container.insertAdjacentHTML('afterbegin', '<button class="select-fullscreen">复制</button>');
    container.insertAdjacentHTML('afterbegin', '<span class="btn-fullscreen el-icon-full-screen"></span>');
    const btnFullscreen = container.querySelector('.btn-fullscreen');
    const selFullscreen = container.querySelector('.select-fullscreen');
    selFullscreen.addEventListener('click', () => {
      const url = urlCollbaration + '?id=' + univerId;
      execCommandPaste(url);
      Vue.prototype.$message({
        showClose: true,
        message: 'Copy Success'
      });
    });
    btnFullscreen.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      Vue.prototype.$bus.$emit('openUniver', demo, univerid)
    })
  }, 100);
  return cache[id] = div;
});
ComponentFactory.register.set('demo7', function (id, obj) {
  if (cache[id]) {
    return cache[id];
  }

  const div = document.createElement('div');
  const univerid = makeid(6)

  div.id = "univer-demo";
  div.setAttribute("data-univerid", univerid)
  div.classList.add("univer-demo");
  div.style.width = '400px';
  div.style.height = '225px';

  let demo = "DEMO7"
  setTimeout(() => {
    const foreignObject = div.parentNode;
    if (foreignObject) {
      foreignObject.id = univerid;
    }
    const container = div;
    stopImmediatePropagation(container)
    let univerSheet = null
    let univerId = null
    initUniverNew(demo, {
      toolbar: false,
      refs: container,
      univerId: getUniverId(id),
      success: (universheet) => {
        univerSheet = universheet
        univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
        setUniverId(id, univerId)
      }
    },)
    container.insertAdjacentHTML('afterbegin', '<button class="select-fullscreen">复制</button>');
    container.insertAdjacentHTML('afterbegin', '<span class="btn-fullscreen el-icon-full-screen"></span>');
    const btnFullscreen = container.querySelector('.btn-fullscreen');
    const selFullscreen = container.querySelector('.select-fullscreen');
    selFullscreen.addEventListener('click', () => {
      const url = urlCollbaration + '?id=' + univerId;
      execCommandPaste(url);
      Vue.prototype.$message({
        showClose: true,
        message: 'Copy Success'
      });
    });
    btnFullscreen.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      Vue.prototype.$bus.$emit('openUniver', demo, univerid)
    })
  }, 100);
  return cache[id] = div;
});
ComponentFactory.register.set('demo8', function (id, obj) {
  if (cache[id]) {
    return cache[id];
  }

  const div = document.createElement('div');
  const univerid = makeid(6)

  div.id = "univer-demo";
  div.setAttribute("data-univerid", univerid)
  div.classList.add("univer-demo");
  div.style.width = '400px';
  div.style.height = '225px';

  let demo = "DEMO8"
  setTimeout(() => {
    const foreignObject = div.parentNode;
    if (foreignObject) {
      foreignObject.id = univerid;
    }
    const container = div;
    stopImmediatePropagation(container)
    let univerSheet = null
    let univerId = null
    initUniverNew(demo, {
      toolbar: false,
      refs: container,
      univerId: getUniverId(id),
      success: (universheet) => {
        univerSheet = universheet
        univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
        setUniverId(id, univerId)
      }
    },)
    container.insertAdjacentHTML('afterbegin', '<button class="select-fullscreen">复制</button>');
    container.insertAdjacentHTML('afterbegin', '<span class="btn-fullscreen el-icon-full-screen"></span>');
    const btnFullscreen = container.querySelector('.btn-fullscreen');
    const selFullscreen = container.querySelector('.select-fullscreen');
    selFullscreen.addEventListener('click', () => {
      const url = urlCollbaration + '?id=' + univerId;
      execCommandPaste(url);
      Vue.prototype.$message({
        showClose: true,
        message: 'Copy Success'
      });
    });
    btnFullscreen.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      Vue.prototype.$bus.$emit('openUniver', demo, univerid)
    })
  }, 100);
  return cache[id] = div;
});

ComponentFactory.register.set('sheet', function (id) {
  if (cache[id]) {
    return cache[id];
  }

  const div = document.createElement('div');
  const univerid = makeid(6)

  div.id = "univer-demo";
  div.setAttribute("data-univerid", univerid)
  div.classList.add("univer-demo");
  div.style.width = '400px';
  div.style.height = '225px';

  let demo = "sheet"
  setTimeout(() => {
    const foreignObject = div.parentNode;
    if (foreignObject) {
      foreignObject.id = univerid;
    }
    // const container = document.querySelector(`[data-univerid="${univerid}"]`);
    const container = div;
    stopImmediatePropagation(container)
    let univerSheet = null
    let univerId = null
    initUniverNew(demo, {
      toolbar: false,
      refs: container,
      univerId: getUniverId(id),
      success: (universheet) => {
        univerSheet = universheet
        univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
        setUniverId(id, univerId)
      }
    },)
    // initUniver(demo, {
    //   toolBar: false,
    //   refs: container
    // })
    container.insertAdjacentHTML('afterbegin', '<button class="select-fullscreen">复制</button>');
    container.insertAdjacentHTML('afterbegin', '<span class="btn-fullscreen el-icon-full-screen"></span>');
    const btnFullscreen = container.querySelector('.btn-fullscreen');
    const selFullscreen = container.querySelector('.select-fullscreen');
    selFullscreen.addEventListener('click', () => {
      const url = urlCollbaration + '?id=' + univerId;
      execCommandPaste(url);
      Vue.prototype.$message({
        showClose: true,
        message: 'Copy Success'
      });
    });
    btnFullscreen.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      Vue.prototype.$bus.$emit('openUniver', demo, univerid)
    })
  }, 100);
  return cache[id] = div;
});
ComponentFactory.register.set('doc', function (id) {
  if (cache[id]) {
    return cache[id];
  }

  const div = document.createElement('div');
  const univerid = makeid(6)

  div.id = "univer-demo";
  div.setAttribute("data-univerid", univerid)
  div.classList.add("univer-demo");
  div.style.width = '400px';
  div.style.height = '225px';

  let demo = "doc"
  setTimeout(() => {
    const foreignObject = div.parentNode;
    if (foreignObject) {
      foreignObject.id = univerid;
    }
    const container = div;
    stopImmediatePropagation(container)
    const univerSheet = initUniverNew(demo, {
      toolBar: false,
      refs: container
    })
    container.insertAdjacentHTML('afterbegin', '<button class="select-fullscreen">复制</button>');
    container.insertAdjacentHTML('afterbegin', '<span class="btn-fullscreen el-icon-full-screen"></span>');
    const btnFullscreen = container.querySelector('.btn-fullscreen');
    const selFullscreen = container.querySelector('.select-fullscreen');
    selFullscreen.addEventListener('click', () => {
      const univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
      execCommandPaste(univerId);
      this.$notify.info({
        title: this.$t('edit.newFeatureNoticeTitle'),
        message: 'Copy Success',
        duration: 1000,
      });
    });
    btnFullscreen.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      Vue.prototype.$bus.$emit('openUniver', demo, univerid)
    })
  }, 100);
  return cache[id] = div;
});
ComponentFactory.register.set('slide', function (id) {
  if (cache[id]) {
    return cache[id];
  }

  const div = document.createElement('div');
  const univerid = makeid(6)

  div.id = "univer-demo";
  div.setAttribute("data-univerid", univerid)
  div.classList.add("univer-demo");
  div.style.width = '400px';
  div.style.height = '225px';

  let demo = "slide"
  setTimeout(() => {
    const foreignObject = div.parentNode;
    if (foreignObject) {
      foreignObject.id = univerid;
    }
    const container = div;
    stopImmediatePropagation(container)
    const univerSheet = initUniverNew(demo, {
      toolBar: false,
      refs: container
    })
    container.insertAdjacentHTML('afterbegin', '<button class="select-fullscreen">复制</button>');
    container.insertAdjacentHTML('afterbegin', '<span class="btn-fullscreen el-icon-full-screen"></span>');
    const btnFullscreen = container.querySelector('.btn-fullscreen');
    const selFullscreen = container.querySelector('.select-fullscreen');
    selFullscreen.addEventListener('click', () => {
      const univerId = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
      execCommandPaste(univerId);
      this.$notify.info({
        title: this.$t('edit.newFeatureNoticeTitle'),
        message: 'Copy Success',
        duration: 1000,
      });
    });
    btnFullscreen.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      Vue.prototype.$bus.$emit('openUniver', demo, univerid)
    })
  }, 100);
  return cache[id] = div;
});

export default {
  name: 'RichTextToolbar',
  components: {
    Color
  },
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      fontSizeList,
      showRichTextToolbar: false,
      style: {
        left: 0,
        top: 0
      },
      fontColor: '',
      fontBackgroundColor: '',
      formatInfo: {}
    }
  },
  computed: {
    fontFamilyList() {
      return fontFamilyList[this.$i18n.locale] || fontFamilyList.zh
    }
  },
  created() {
    this.$bus.$on('rich_text_selection_change', this.onRichTextSelectionChange)
    this.mindMap.on('rich_text_init_change', () => {
      this.mindMap.richText.quill.root.addEventListener('paste', (e) => {
        readExcelCopyData(e, (result) => {
          if (result['html']) {
            this.univerDemo1(result['html'])
          } else if (result['text']) {
            this.univerDemo1(result['text'])
          }
        });
      });
    })

  },
  mounted() {
    document.body.append(this.$refs.richTextToolbar)
    window.dispatchEvent(new Event('resize', {}));

  },
  beforeDestroy() {
    this.$bus.$off('rich_text_selection_change', this.onRichTextSelectionChange)
  },
  methods: {
    onRichTextSelectionChange(hasRange, rect, formatInfo) {
      if (hasRange) {
        this.style.left = rect.left + rect.width / 2 + 'px'
        this.style.top = rect.top - 60 + 'px'
        this.formatInfo = {...(formatInfo || {})}
      }
      this.showRichTextToolbar = hasRange
    },

    toggleItalic() {
      this.formatInfo.italic = !this.formatInfo.italic
      this.mindMap.richText.formatText({
        italic: this.formatInfo.italic
      })
    },

    toggleUnderline() {
      this.formatInfo.underline = !this.formatInfo.underline
      this.mindMap.richText.formatText({
        underline: this.formatInfo.underline
      })
    },

    toggleStrike() {
      this.formatInfo.strike = !this.formatInfo.strike
      this.mindMap.richText.formatText({
        strike: this.formatInfo.strike
      })
    },

    toggleBold() {
      this.formatInfo.bold = !this.formatInfo.bold
      this.mindMap.richText.formatText({
        bold: this.formatInfo.bold
      });
    },

    changeFontSize(size) {
      this.formatInfo.size = size
      this.mindMap.richText.formatText({
        size: size + 'px'
      })
    },

    univerDemo1(attr) {
      const activeNode = this.mindMap.renderer.activeNodeList[0];
      this.mindMap.richText.cancelEditText();
      activeNode.setComponent('demo1', {attr});
    },
    univerDemo2() {
      const activeNode = this.mindMap.renderer.activeNodeList[0];
      this.mindMap.richText.cancelEditText();
      activeNode.setComponent('demo2');
    },
    univerDemo3() {
      const activeNode = this.mindMap.renderer.activeNodeList[0];
      this.mindMap.richText.cancelEditText();
      activeNode.setComponent('demo3');
    },
    univerDemo4() {
      const activeNode = this.mindMap.renderer.activeNodeList[0];
      this.mindMap.richText.cancelEditText();
      activeNode.setComponent('demo4');
    },
    univerDemo5() {
      const activeNode = this.mindMap.renderer.activeNodeList[0];
      this.mindMap.richText.cancelEditText();
      activeNode.setComponent('demo5');
    },
    univerDemo6() {
      const activeNode = this.mindMap.renderer.activeNodeList[0];
      this.mindMap.richText.cancelEditText();
      activeNode.setComponent('demo6', {});
    },
    univerDemo7() {
      const activeNode = this.mindMap.renderer.activeNodeList[0];
      this.mindMap.richText.cancelEditText();
      activeNode.setComponent('demo7');
    },
    univerDemo8() {
      const activeNode = this.mindMap.renderer.activeNodeList[0];
      this.mindMap.richText.cancelEditText();
      activeNode.setComponent('demo8');
    },

    univerSheet() {
      const activeNode = this.mindMap.renderer.activeNodeList[0];
      this.mindMap.richText.cancelEditText();
      activeNode.setComponent('sheet');
    },

    univerDoc() {
      const activeNode = this.mindMap.renderer.activeNodeList[0];
      this.mindMap.richText.cancelEditText();
      activeNode.setComponent('doc');
    },

    univerSlide() {
      const activeNode = this.mindMap.renderer.activeNodeList[0];
      this.mindMap.richText.cancelEditText();
      activeNode.setComponent('slide');
    },

    removeFormat() {
      this.mindMap.richText.removeFormat()
    },

    changeFontFamily(font) {
      this.formatInfo.font = font
      this.mindMap.richText.formatText({
        font
      })
    },

    changeFontColor(color) {
      this.formatInfo.color = color
      this.mindMap.richText.formatText({
        color
      })
    },

    changeFontBackgroundColor(background) {
      this.formatInfo.background = background
      this.mindMap.richText.formatText({
        background
      })
    },

  }
}
</script>

<style lang="less" scoped>
.univerTooltip {
  width: max-content !important;
  padding: 10px;
}

.richTextToolbar {
  position: fixed;
  z-index: 99999;
  height: 55px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  transform: translateX(-50%);

  .btn {
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: #eefbed;
    }

    &.active {
      color: #12bb37;
    }

    .icon {
      font-size: 20px;

      &.fontColor {
        font-size: 26px;
      }
    }
  }
}

.fontOptionsList {
  width: 150px;

  .fontOptionItem {
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: #f7f7f7;
    }

    &.active {
      color: #12bb37;
    }
  }
}
</style>
