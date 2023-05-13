<template>
  <div id="aside">
    <div class="default-show">
      <ul>
        <li
          v-for="(item, index) in subnavitem"
          :class="{ 'is-active': defaultActive == item.path }"
          @click="selectMenu(item.path)"
          :key="index"
        >
          <i :class="item.icon" class="iconfont"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>

    <div class="mycreat" v-if="userSongList.length >= 1">
      <el-menu class="el-menu-vertical-demo" router unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <div style="margin-left: 16px;">
              <span class="icon-shouye iconfont" style="margin-top: 10px;"></span>
              <span>我的音乐</span>
            </div>
          </template>

          <el-menu-item :index="'/songlistdetail/' + createdSongList[0].id">
            <i class="iconfont icon-xihuan"></i>
            <span style="margin-bottom: 18px;">我的喜欢</span>
          </el-menu-item>

          <el-submenu index="1-1">
            <template slot="title">我创建的歌单</template>
            <el-menu-item
              v-for="item in createdSongList.slice(1)"
              :key="item.id"
              :index="'/songlistdetail/' + item.id"
              ><span>{{ item.name }}</span></el-menu-item
            >
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">我收藏的歌单</template>
            <el-menu-item
              v-for="item in collectSongList"
              :key="item.id"
              :index="'/songlistdetail/' + item.id"
              >{{ item.name }}</el-menu-item
            >
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Aside",
  data() {
    return {
      subnavitem: [
        { name: "发现音乐", path: "/findmusic", icon: "icon-yinyueclick" },
        { name: "推荐视频", path: "/recvideo", icon: "icon-shipin1" },
        { name: "推荐音乐", path: "/receveryday", icon: "icon-dianzan" },
        { name: "我的收藏", path: "/myfavorite", icon: "icon-myfavorite" },
      ],
      collectIndex: null,
    };
  },
  computed: {
    ...mapGetters(["userSongList", "userInfo"]),

    // 路由嵌套，导致页面刷新路由的path值需要手动更改
    defaultActive() {
      return "/" + this.$route.path.split("/")[1];
    },
    createdSongList() {
      // 找到第一个不是自己歌单的索引，前面的为用户自己的，后面的为收藏的
      this.collectIndex = this.userSongList.findIndex((item) => item.creator.userId != this.userInfo.userId);
      // 截取用户创建的歌单
      if (this.collectIndex !== -1) {
        return this.userSongList.slice(0, this.collectIndex);
      } else {
        return this.userSongList;
      }
    },
    collectSongList() {
      if (this.collectIndex !== -1) {
        return this.userSongList.slice(this.collectIndex);
      } else {
        return [];
      }
    },
  },
  methods: {
    selectMenu(curPath) {
      this.$router.push(curPath);
    },
  },
};
</script>

<style lang="less" scoped>
#aside {
  height: 100%;
  width: 230px;
  overflow-y: scroll;
  border-right: 1px solid #dddddd;
  padding-top: 2px;
  .el-menu {
    border-right: 0;
    background-color: #fafafa;
  }
  .el-submenu {
    margin-left: -19px;
    .iconfont {
      display: inline-flex;
      width: 32px;
      height: 32px;
      margin-top: 10px;
      box-shadow: 0 4px 6px;
      border-radius: 6px;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      font-size: 18px;
      color: #909090;
      vertical-align: top;
    }
  }
  .el-menu-item {
    height: 53px;
    line-height: 53px;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-menu-item.is-active {
    &.is-active {
      font-weight: 400;
      background-color: #fff;

      .iconfont {
        color: #fff;
        background-color: var(--color-text-height);
      }
    }
  }
  .el-menu-item:hover {
    background: rgb(245, 245, 245, 0.3);
  }

  .default-show ul li {
    display: block;
    padding: 10px 16px;
    border-radius: 8px;
    text-align: left;
    font-weight: 300;
    cursor: pointer;
    .iconfont {
      display: inline-flex;
      width: 32px;
      height: 32px;
      background-color: #fff;
      box-shadow: 0 4px 6px;
      border-radius: 6px;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      font-size: 18px;
      color: #909090;
      vertical-align: top;
    }

    &.is-active {
      font-weight: 400;
      background-color: #fff;
      color: #409eff;

      .iconfont {
        color: #fff;
        background-color: var(--color-text-height);
      }
    }
    span {
      display: inline-block;
      line-height: 32px;
    }
  }
}
@media screen and (max-width: 600px) {
  #aside {
    display: none;
  }
}
</style>
