<template>
  <div id="header">
    <!-- 标题logo -->
    <div class="title">
      <!-- <div class="icon"><span class="iconfont icon-yinleyanzou"></span></div>
      <div class="text"><span>BlueMusic</span></div> -->
    </div>

    <!-- 搜索框 -->
    <div class="search">
      <Searchinput />
    </div>
    <!-- 右侧登录 -->
    <div class="right-login">
      <Login />
    </div>
    <!-- 主题 -->
    <!-- <div class="pifu">
      <el-popover ref="popover" placement="bottom" width="150" trigger="click">
        <span class="iconfont icon-pifu" slot="reference"></span>
        <ThemePicker />
      </el-popover>
    </div> -->
    <!-- 全屏按钮 -->
    <!-- <div class="full">
      <span class="iconfont icon-quanping" @click="full" v-if="!isFull" title="全屏"></span>
      <span class="iconfont icon-cancel-full-screen" @click="exitFull" v-if="isFull" title="退出全屏"></span>
    </div> -->
  </div>
</template>

<script>
import Searchinput from "components/common/Searchinput.vue";
import Login from "components/content/login/Login.vue";
import ThemePicker from "../components/common/ThemePicker.vue";
import { requestFullScreen, exitFullscreen, isFullscreen } from "common/utils.js";
export default {
  name: "Header",
  components: { Searchinput, Login, ThemePicker },
  // data() {
  //   return {
  //     isFull: false,
  //   };
  // },
  // methods: {
  //   full() {
  //     requestFullScreen();
  //     this.isFull = true;
  //   },
  //   exitFull() {
  //     exitFullscreen();
  //     this.isFull = false;
  //   },
  // },
  // mounted() {
  //   window.onresize = () => {
  //     if (!isFullscreen()) {
  //       this.isFull = false;
  //     }
  //   };
  //   document.addEventListener("keyup", (e) => {
  //     //f11全屏
  //     if (e.code == 122) {
  //       this.isFull = !this.isFull;
  //     }
  //   });
  // },
};
</script>
<style lang="less" scoped>
#header {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  background: pink;
  z-index: 99;
  .title {
    flex: 2;
    display: flex;
    align-items: center;
    height: 60px;
    margin-left: 10px;
    .icon {
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      .icon-yinleyanzou {
        color: #fff;
        font-size: 34px;
        font-weight: 700;
      }
    }
    .text {
      font-size: 22px;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 60px;
    }
  }

  .search {
    flex: 2;
    margin-left: 240px;
  }
  .right-login {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    flex: 12;
  }
  // .pifu {
  //   padding-right: 15px;
  //   color: #fff;
  //   cursor: pointer;
  // }
  // .full {
  //   padding-right: 20px;
  //   color: #fff;
  //   cursor: pointer;
  // }
}
</style>
