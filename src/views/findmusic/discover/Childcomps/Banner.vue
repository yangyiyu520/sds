<template>
  <div class="banner" v-if="banner.length !== 0">
    <el-carousel :interval="3000" type="card" height="180px">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <img :src="item.imageUrl" @click="playMusic(item)" />
        <div class="title">{{ item.typeTitle }}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getSongUrl } from "network/playmusic/playmusic.js";
import { getEverySongDetail } from "network/songlistdetail/songlistdetail";
export default {
  name: "Banner",
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    // setTimeout(() => {
    //   console.log("", JSON.parse(JSON.stringify(this.banner)));
    // }, 200);
  },
  methods: {
    playMusic(item) {
      if (item.targetType == 1 || item.typeTitle == 300) {
        // 获取歌曲url;
        getSongUrl(item.targetId)
          .then((res) => {
            this.$store.commit("saveSongUrl", res.data.data[0].url);
          })
          .catch((err) => err);
        /* 根据歌曲id获取每首歌的信息*/
        getEverySongDetail(item.targetId)
          .then((res) => {
            console.log("", JSON.parse(JSON.stringify(res.data.songs[0])));
            // 提交vuex保存当前歌曲详情
            this.$store.commit("saveSongDetail", res.data.songs[0]);
            // 提交vuex添加到播放列表
            this.$store.commit("addPlayinglist", res.data.songs[0]);
          })
          .catch((err) => err);
      } else if (item.targetType == 1000) {
        this.$router.push("/songlistdetail/" + item.targetId);
      } else if (item.targetType == 10) {
        this.$router.push("/albumdetail/" + item.targetId);
      } else if (item.targetType == 3000) {
        window.open("https://y.music.163.com/m/at/63b02c423f08e068adabd182", "_blank");
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.banner {
  position: relative;
  img {
    height: 100%;
    width: 80%;
    border-radius: 10px;
  }
}
.title {
  position: absolute;
  right: 20%;
  bottom: 0;
  padding: 3px 8px;
  color: #fff;
  font-size: 12px;
  background: var(--themeColor);
}
::v-deep .el-carousel__indicators--outside button {
  background-color: var(--themeColor);
}
::v-deep .el-carousel__button {
  width: 15px;
  height: 15px;
  border-radius: 15px;
}
</style>
